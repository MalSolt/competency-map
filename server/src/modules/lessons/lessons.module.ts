import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Logger } from '@nestjs/common';
import { Lesson } from 'src/domain/entities/lesson.entity';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { LessonsSeeder } from './seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  providers: [LessonsService, LessonsSeeder, Logger],
  controllers: [LessonsController],
  exports: [LessonsService, LessonsSeeder],
})
export class LessonsModule {}
