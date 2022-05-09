import { Global, Injectable, Logger } from '@nestjs/common';
import { DeveloperLevelsService } from '../developerLevels.service';

@Global()
@Injectable()
export class DeveloperLevelsSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly developerLevelsService: DeveloperLevelsService,
  ) {}

  async seed() {
    await this.developerLevels()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding developerLevels...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding developerLevels...');
        Promise.reject(error);
      });
  }

  async developerLevels() {
    await this.developerLevelsService.clear();
  }
}
