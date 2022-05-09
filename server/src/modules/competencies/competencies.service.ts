import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CompetencyDto,
  CreateCompetencyDto,
  UpdateCompetencyDto,
} from '@dto/competency';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetencyId } from '@shared/kernel';
import { PositionDto } from '@dto/competencyPosition';
import {
  Competency,
  tableName,
  depsTableName,
} from 'src/domain/entities/competency.entity';
import {
  CompetencyPosition,
  tableName as positionTableName,
} from 'src/domain/entities/competency-position.entity';
import { checkNotNullParams } from 'src/shared/checks';

@Injectable()
export class CompetenciesService {
  constructor(
    @InjectRepository(Competency)
    private competencyRepository: Repository<Competency>,
    @InjectRepository(CompetencyPosition)
    private competencyPosition: Repository<CompetencyPosition>,
  ) {}

  findCompetencies(
    options?: FindManyOptions<Competency>,
  ): Promise<Competency[]> {
    return this.competencyRepository.find(options);
  }

  async findCompetency(
    id: CompetencyId,
    options?: FindOneOptions<Competency>,
  ): Promise<Competency> {
    const competency = await this.competencyRepository.findOne(id, options);

    if (!competency) {
      throw new NotFoundException(`Competency with Id: ${id} not found`);
    }

    return competency;
  }

  create(createCompetencyDto: CreateCompetencyDto) {
    checkNotNullParams({
      title: createCompetencyDto.title,
    });

    const competency = this.competencyRepository.create(createCompetencyDto);
    return this.competencyRepository.save(competency);
  }

  async findAll(): Promise<CompetencyDto[]> {
    const competencies = await this.competencyRepository.find({
      relations: [
        'requirements',
        'position',
        'developerLevel',
        'image',
        'knowledges',
      ],
    });

    return competencies;
  }

  async findOne(id: CompetencyId): Promise<CompetencyDto> {
    checkNotNullParams({ id });

    const competency = await this.findCompetency(id, {
      relations: [
        'requirements',
        'position',
        'developerLevel',
        'image',
        'knowledges',
      ],
    });

    return competency;
  }

  async update(
    id: CompetencyId,
    updateCompetencyDto: UpdateCompetencyDto,
  ): Promise<CompetencyDto> {
    checkNotNullParams({ id });

    const competency = await this.findCompetency(id);

    return this.competencyRepository.save({
      ...competency,
      ...updateCompetencyDto,
    });
  }

  async remove(id: CompetencyId) {
    checkNotNullParams({ id });

    await this.findCompetency(id);

    return this.competencyRepository.delete(id);
  }

  async clear() {
    await this.competencyRepository.query(`DELETE FROM ${tableName};`);
    await this.competencyRepository.query(`DELETE FROM "${depsTableName}";`);
    await this.competencyPosition.query(`DELETE FROM "${positionTableName}";`);
    return;
  }

  async upsertPosition(
    id: CompetencyId,
    position: PositionDto,
  ): Promise<PositionDto> {
    const competency = await this.findCompetency(id);

    const createPosition = this.competencyPosition.create({
      x: position.x,
      y: position.y,
      competency,
    });
    return this.competencyPosition.save(createPosition);
  }

  async removePosition(id: CompetencyId) {
    const competency = await this.findCompetency(id, {
      relations: ['position'],
    });

    const positionId = competency.position.id;

    await this.competencyRepository.save({ ...competency, position: null });

    return await this.competencyPosition.delete(positionId);
  }
}
