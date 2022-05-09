import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Role, UserId } from '@shared/kernel';
import { CreateUserBodyDto, UpdateUserBodyDto } from '@dto/user';
import { User, tableName } from 'src/domain/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  me(request: Request) {
    return request.user;
  }

  async findUser(
    options?: FindOneOptions<User>,
    withoutError?: boolean,
  ): Promise<User> {
    const user = await this.userRepository.findOne(options);

    if (!user && !withoutError) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async updateRole(id: UserId, updateRole: { role: Role }) {
    const { role } = updateRole;

    const user = await this.findUser({ where: { id } });

    const roles: Role[] = ['admin', 'mentor', 'user'];

    if (!roles.includes(role)) {
      throw new BadRequestException(`Role must be one of: ${roles.join(', ')}`);
    }

    return this.userRepository.save({
      ...user,
      role,
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async findOne(id: UserId) {
    const user = await this.findUser({ where: { id } });

    return user;
  }

  async createUser(createUserBodyDto: CreateUserBodyDto) {
    const newUser = this.userRepository.create(createUserBodyDto);

    return this.userRepository.save(newUser);
  }

  async updateUser(updateUserBodyDto: UpdateUserBodyDto) {
    return this.userRepository.save(updateUserBodyDto);
  }

  clear() {
    return this.userRepository.query(`DELETE FROM ${tableName};`);
  }
}
