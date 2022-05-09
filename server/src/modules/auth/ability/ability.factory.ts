import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { AdminAbilityFactory } from './admin-ability.factory';
import { MentorAbilityFactory } from './mentor-ability.factory';
import { UserAbilityFactory } from './user-ability.factory';

@Injectable()
export class AbilityFactory {
  constructor(
    private adminAbilityFactory: AdminAbilityFactory,
    private userAbilityFactory: UserAbilityFactory,
    private mentorAbilityFactory: MentorAbilityFactory,
  ) {}

  createForUser(user: User) {
    switch (user.role) {
      case 'admin':
        return this.adminAbilityFactory.createForUser(user);
      case 'mentor':
        return this.mentorAbilityFactory.createForUser(user);
      case 'user':
        return this.userAbilityFactory.createForUser(user);
    }
  }
}
