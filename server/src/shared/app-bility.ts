import { Ability, AbilityClass } from '@casl/ability';
import { Abilities } from '@shared/ability';

export type AppAbility = Ability<Abilities>;
export const AppAbility = Ability as AbilityClass<AppAbility>;
