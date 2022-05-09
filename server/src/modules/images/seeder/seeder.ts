import { Global, Injectable, Logger } from '@nestjs/common';
import { ImagesService } from '../images.service';

@Global()
@Injectable()
export class ImagesSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly imagesService: ImagesService,
  ) {}

  async seed() {
    await this.images()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding images...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding images...');
        Promise.reject(error);
      });
  }

  async images() {
    await this.imagesService.clear();
  }
}
