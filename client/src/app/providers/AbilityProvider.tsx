import { FC } from 'react';
import { useServerAbility } from 'controllers/auth/useServerAbility';
import { AbilityContext } from 'shared/lib/ablity';

export const AbilityProvider: FC = ({ children }) => {
  const { ability, isLoading } = useServerAbility();

  return (
    <AbilityContext.Provider value={ability}>
      {isLoading ? null : children}
    </AbilityContext.Provider>
  );
};
