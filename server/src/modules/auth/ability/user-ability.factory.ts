import { AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { AppAbility } from 'src/shared/app-bility';

@Injectable()
export class UserAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder(AppAbility);

    // USER
    can('manage', 'User', { id: user.id });
    can('manage', 'UserMap', { userId: user.id });

    // USER-COMPETENCIES
    can('update-status-not_learned', 'UserCompetency');
    can('update-status-in_progress', 'UserCompetency');

    return build();
  }
}
