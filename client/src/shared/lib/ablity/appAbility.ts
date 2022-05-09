import { Ability, AbilityClass } from '@casl/ability';
import { Abilities } from '@shared/ability';

export type AppAbility = Ability<Abilities>;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AppAbility = Ability as AbilityClass<AppAbility>;
