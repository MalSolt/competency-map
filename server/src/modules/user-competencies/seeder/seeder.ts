import { Global, Injectable, Logger } from '@nestjs/common';
import { UserCompetenciesService } from '../user-competencies.service';

@Global()
@Injectable()
export class UsersCompetenciesSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly userCompetenciesService: UserCompetenciesService,
  ) {}

  async seed() {
    await this.usersCompetencies()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding user-competencies...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding user-competencies...');
        Promise.reject(error);
      });
  }

  async usersCompetencies() {
    await this.userCompetenciesService.clear();
  }
}
