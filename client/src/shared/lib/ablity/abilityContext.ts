import { createContext, useContext } from 'react';
import { createContextualCan } from '@casl/react';
import { AppAbility } from './appAbility';

export const AbilityContext = createContext(new AppAbility([]));
export const Can = createContextualCan(AbilityContext.Consumer);
export const useAppAbility = () => useContext(AbilityContext);
