import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/domain/entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSeeder } from './seeder';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersSeeder, Logger],
  exports: [UsersService, UsersSeeder],
})
export class UsersModule {}
