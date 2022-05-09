import { Global, Injectable, Logger } from '@nestjs/common';
import { MaterialsService } from '../materials.service';

@Global()
@Injectable()
export class MaterialsSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly materialsService: MaterialsService,
  ) {}

  async seed() {
    await this.materials()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding materials...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding materials...');
        Promise.reject(error);
      });
  }

  async materials() {
    await this.materialsService.clear();
  }
}
