import { Logger, Module } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeController } from './knowledge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Knowledge } from 'src/domain/entities/knowledge.entity';
import { KnowledgeSeeder } from './seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Knowledge])],
  controllers: [KnowledgeController],
  providers: [KnowledgeService, KnowledgeSeeder, Logger],
  exports: [KnowledgeService, KnowledgeSeeder],
})
export class KnowledgeModule {}
