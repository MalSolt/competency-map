import { LessonsSeeder } from './lessons/seeder/seeder';
import { DeveloperLevelsSeeder } from './developerLevels/seeder/seeder';
import { ImagesSeeder } from './images/seeder/seeder';
import { Global, Injectable } from '@nestjs/common';
import { CompetenciesSeeder } from './competencies/seeder';
import { KnowledgeSeeder } from './knowledge/seeder';
import { UsersCompetenciesSeeder } from './user-competencies/seeder';
import { UsersSeeder } from './users/seeder';
import { MaterialsSeeder } from './materials/seeder';

@Global()
@Injectable()
export class Seeder {
  constructor(
    private readonly imagesSeeder: ImagesSeeder,
    private readonly usersSeeder: UsersSeeder,
    private readonly userCompetencieSeeder: UsersCompetenciesSeeder,
    private readonly developerLevelsSeeder: DeveloperLevelsSeeder,
    private readonly knowledgeSeeder: KnowledgeSeeder,
    private readonly lessonsSeeder: LessonsSeeder,
    private readonly materialsSeeder: MaterialsSeeder,
    private readonly competenciesSeeder: CompetenciesSeeder,
  ) {}

  async seed() {
    await this.userCompetencieSeeder.seed();
    await this.usersSeeder.seed();
    await this.materialsSeeder.seed();
    await this.lessonsSeeder.seed();
    await this.competenciesSeeder.seed();
    await this.knowledgeSeeder.seed();
    await this.developerLevelsSeeder.seed();
    await this.imagesSeeder.seed();
  }
}
