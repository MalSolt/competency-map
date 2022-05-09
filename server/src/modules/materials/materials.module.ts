import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Logger } from '@nestjs/common';

import { Material } from 'src/domain/entities/material.entity';
import { MaterialsCollection } from 'src/domain/entities/materials-collection.entity';
import { CompetenciesModule } from 'src/modules/competencies/competencies.module';
import { LessonsModule } from 'src/modules/lessons/lessons.module';

import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { MaterialsSeeder } from './seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([Material, MaterialsCollection]),
    CompetenciesModule,
    LessonsModule,
  ],
  providers: [MaterialsService, MaterialsSeeder, Logger],
  controllers: [MaterialsController],
  exports: [MaterialsService, MaterialsSeeder],
})
export class MaterialsModule {}
