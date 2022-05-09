import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competency } from 'src/domain/entities/competency.entity';
import { CompetencyPosition } from 'src/domain/entities/competency-position.entity';
import { CompetenciesService } from './competencies.service';
import { CompetenciesController } from './competencies.controller';
import { CompetenciesSeeder } from './seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Competency, CompetencyPosition])],
  controllers: [CompetenciesController],
  providers: [CompetenciesService, CompetenciesSeeder, Logger],
  exports: [CompetenciesService, CompetenciesSeeder],
})
export class CompetenciesModule {}
