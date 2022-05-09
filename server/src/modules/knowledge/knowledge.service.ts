import { Injectable, NotFoundException } from '@nestjs/common';
import {
  KnowledgeDto,
  CreateKnowledgeDto,
  UpdateKnowledgeDto,
} from '@dto/knowledge';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { KnowledgeId } from '@shared/kernel';
import { Knowledge, tableName } from 'src/domain/entities/knowledge.entity';
import { checkNotNullParams } from 'src/shared/checks';
import { knowledgesDepsTableName } from 'src/domain/entities/competency.entity';

@Injectable()
export class KnowledgeService {
  constructor(
    @InjectRepository(Knowledge)
    private knowledgeRepository: Repository<Knowledge>,
  ) {}

  async findKnowledge(
    id: KnowledgeId,
    options?: FindOneOptions<Knowledge>,
  ): Promise<Knowledge> {
    const knowledge = await this.knowledgeRepository.findOne(id, options);

    if (!knowledge) {
      throw new NotFoundException(`Knowledge with Id: ${id} not found`);
    }

    return knowledge;
  }

  create(createCompetencyDto: CreateKnowledgeDto) {
    checkNotNullParams(createCompetencyDto);

    const knowledge = this.knowledgeRepository.create(createCompetencyDto);
    return this.knowledgeRepository.save(knowledge);
  }

  findAll(): Promise<KnowledgeDto[]> {
    return this.knowledgeRepository.find();
  }

  async findOne(id: KnowledgeId): Promise<KnowledgeDto> {
    const knowledge = await this.findKnowledge(id);

    return knowledge;
  }

  async update(id: KnowledgeId, updateKnowledgeDto: UpdateKnowledgeDto) {
    const knowledge = await this.findKnowledge(id);

    return this.knowledgeRepository.save({
      ...knowledge,
      ...updateKnowledgeDto,
    });
  }

  async remove(id: KnowledgeId) {
    const knowledge = await this.knowledgeRepository.findOne(id);

    if (!knowledge) {
      throw new NotFoundException(`Knowledge with Id: ${id} not found`);
    }

    await this.knowledgeRepository.delete(id);

    return { message: 'ok' };
  }

  async clear() {
    await this.knowledgeRepository.query(
      `DELETE FROM "${knowledgesDepsTableName}"`,
    );
    await this.knowledgeRepository.query(`DELETE FROM ${tableName};`);

    return;
  }
}
