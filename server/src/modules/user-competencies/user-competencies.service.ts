import { CompetencyId, UserId } from '@shared/kernel';
import { FindOneOptions, Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UpdateUserCompetencyDto,
  UserCompetencyRelationDto,
  UserCompetencyStatus,
} from '@dto/userCompetency';
import { CompetencyWithUserDto } from '@dto/competency';
import {
  UserCompetency,
  tableName,
} from 'src/domain/entities/user-competencies.entity';
import { checkNotNullParams } from 'src/shared/checks';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/domain/entities/user.entity';
import { Competency } from 'src/domain/entities/competency.entity';
import { CompetenciesService } from '../competencies/competencies.service';

type findUserCompetencyReturnValue = {
  userCompetency: UserCompetency;
  user: User;
  competency: Competency;
};

@Injectable()
export class UserCompetenciesService {
  constructor(
    @InjectRepository(UserCompetency)
    private readonly userCompetencyRepository: Repository<UserCompetency>,
    private readonly usersService: UsersService,
    private readonly competenciesService: CompetenciesService,
  ) {}

  async findUserCompetency(
    userId: UserId,
    competencyId: CompetencyId,
    options?: FindOneOptions<UserCompetency>,
    withoutError?: boolean,
  ): Promise<findUserCompetencyReturnValue> {
    const user = await this.usersService.findOne(userId);
    const competency = await this.competenciesService.findCompetency(
      competencyId,
    );

    const userCompetency = await this.userCompetencyRepository.findOne({
      ...options,
      where: {
        user,
        competency,
      },
    });

    if (!withoutError && !userCompetency) {
      throw new NotFoundException(
        `User with id: ${userId} does not have competency id: ${competencyId}`,
      );
    }

    return { userCompetency, user, competency };
  }

  async getUserCompetencies(userId: UserId) {
    const user = await this.usersService.findUser({ where: { id: userId } });

    const competencies = await this.competenciesService.findAll();

    const userCompetencies = await this.userCompetencyRepository.find({
      where: { user },
      relations: ['competency'],
    });

    const preparedCompetencies: CompetencyWithUserDto[] = competencies.reduce(
      (accum, current) => {
        const userCompetency = userCompetencies.find(
          ({ competency }) => current.id === competency.id,
        );

        let userCompetencyInfo: UserCompetencyRelationDto = null;

        if (userCompetency) {
          userCompetencyInfo = {
            id: userCompetency.id,
            status: userCompetency.status,
          };
        }

        return [...accum, { ...current, userCompetencyInfo }];
      },
      [],
    );

    return preparedCompetencies;
  }

  async updateUserCompetencyStatus({
    userId,
    competencyId,
    status,
  }: UpdateUserCompetencyDto) {
    checkNotNullParams({ userId, competencyId, status });

    const { userCompetency, user, competency } = await this.findUserCompetency(
      userId,
      competencyId,
      {},
      true,
    );

    const available_statuses: UserCompetencyStatus[] = [
      'not_learned',
      'in_progress',
      'learned',
      'confirmed',
    ];

    if (!available_statuses.includes(status)) {
      throw new BadRequestException(
        `Status must be one of: ${available_statuses.join(',')}`,
      );
    }

    if (!userCompetency) {
      // create it

      const newUserCompetency = this.userCompetencyRepository.create({
        user,
        competency,
        status,
      });

      await this.userCompetencyRepository.save(newUserCompetency);

      return {
        id: newUserCompetency.id,
        status: newUserCompetency.status,
        userId,
        competencyId,
      };
    }

    if (status === 'not_learned') {
      // delete it
      await this.userCompetencyRepository.delete(userCompetency.id);

      return { message: 'ok' };
    }

    // update it
    await this.userCompetencyRepository.save({
      ...userCompetency,
      status,
    });

    return {
      id: userCompetency.id,
      status,
      userId,
      competencyId,
    };
  }

  clear() {
    return this.userCompetencyRepository.query(`DELETE FROM "${tableName}";`);
  }
}
