import { Global, Injectable, Logger } from '@nestjs/common';
import { CompetenciesService } from '../competencies.service';
import { competencies } from './seeder.data';

@Global()
@Injectable()
export class CompetenciesSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly competenciesService: CompetenciesService,
  ) {}

  async seed() {
    await this.competencies()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding competencies...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding competencies...');
        Promise.reject(error);
      });
  }

  async competencies() {
    await this.competenciesService.clear();

    for (const competency of competencies) {
      await this.competenciesService.create(competency);
    }
  }
}
