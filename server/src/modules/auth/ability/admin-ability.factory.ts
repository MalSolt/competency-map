import { AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { AppAbility } from 'src/shared/app-bility';

@Injectable()
export class AdminAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder(AppAbility);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    can('manage', 'all');

    return build();
  }
}
