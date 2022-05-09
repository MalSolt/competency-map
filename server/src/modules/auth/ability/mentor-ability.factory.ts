import { AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { AppAbility } from 'src/shared/app-bility';

@Injectable()
export class MentorAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder(AppAbility);

    // USER
    can('update', 'User');

    // USER_COMPETENCIES
    can('update-status-not_learned', 'UserCompetency');
    can('update-status-in_progress', 'UserCompetency');
    can('update-status-learned', 'UserCompetency');
    can('update-status-confirmed', 'UserCompetency');

    return build();
  }
}
