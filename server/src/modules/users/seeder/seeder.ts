import { Global, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users.service';
import { users } from './seeder.data';

@Global()
@Injectable()
export class UsersSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
  ) {}

  async seed() {
    await this.users()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }

  async users() {
    await this.usersService.clear();

    for (const user of users) {
      await this.usersService.createUser(user);
    }
  }
}
