import { Global, Injectable, Logger } from '@nestjs/common';
import { LessonsService } from '../lessons.service';

@Global()
@Injectable()
export class LessonsSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly lessonsService: LessonsService,
  ) {}

  async seed() {
    await this.lessons()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding lessons...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding lessons...');
        Promise.reject(error);
      });
  }

  async lessons() {
    await this.lessonsService.clear();
  }
}
