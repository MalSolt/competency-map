import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Logger } from '@nestjs/common';
import { UserCompetenciesController } from './user-competencies.controller';
import { UserCompetenciesService } from './user-competencies.service';
import { UserCompetency } from 'src/domain/entities/user-competencies.entity';
import { UsersModule } from '../users/users.module';
import { CompetenciesModule } from '../competencies/competencies.module';
import { UsersCompetenciesSeeder } from './seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCompetency]),
    UsersModule,
    CompetenciesModule,
  ],
  controllers: [UserCompetenciesController],
  providers: [UserCompetenciesService, UsersCompetenciesSeeder, Logger],
  exports: [UserCompetenciesService, UsersCompetenciesSeeder],
})
export class UserCompetenciesModule {}
