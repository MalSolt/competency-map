import { Module, Logger } from '@nestjs/common';
import { DeveloperLevelsService } from './developerLevels.service';
import { DeveloperLevelsController } from './developerLevels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperLevel } from 'src/domain/entities/developer-level.entity';
import { DeveloperLevelsSeeder } from './seeder';

@Module({
  imports: [TypeOrmModule.forFeature([DeveloperLevel])],
  controllers: [DeveloperLevelsController],
  providers: [DeveloperLevelsService, DeveloperLevelsSeeder, Logger],
  exports: [DeveloperLevelsService, DeveloperLevelsSeeder],
})
export class DeveloperLevelsModule {}
