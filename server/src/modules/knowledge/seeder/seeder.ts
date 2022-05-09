import { Global, Injectable, Logger } from '@nestjs/common';
import { KnowledgeService } from '../knowledge.service';

@Global()
@Injectable()
export class KnowledgeSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly knowledgeService: KnowledgeService,
  ) {}

  async seed() {
    await this.knowledge()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding knowledges...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding knowledges...');
        Promise.reject(error);
      });
  }

  async knowledge() {
    await this.knowledgeService.findAll();
    // await this.KnowledgeService.clear();
  }
}
