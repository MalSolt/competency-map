import { Injectable } from '@nestjs/common';
import { DeveloperLevelDto } from '@dto/developerLevel';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeveloperLevel,
  tableName,
} from 'src/domain/entities/developer-level.entity';
import { developerLevels as data } from './seeder/seeder.data';

@Injectable()
export class DeveloperLevelsService {
  constructor(
    @InjectRepository(DeveloperLevel)
    private repository: Repository<DeveloperLevel>,
  ) {}

  async onModuleInit() {
    const developerLevels = await this.repository.find({});
    if (developerLevels.length === 0) {
      data.map(async (item) => {
        const developerLevel = await this.repository.create(item);
        await this.repository.save(developerLevel);
      });
    }
  }

  findAll(): Promise<DeveloperLevelDto[]> {
    return this.repository.find({});
  }

  async clear() {
    return this.repository.query(`DELETE FROM "${tableName}";`);
  }
}
