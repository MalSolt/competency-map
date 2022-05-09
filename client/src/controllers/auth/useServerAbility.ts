import { useQuery } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { AppAbility } from 'shared/lib/ablity/appAbility';
import { useMemo } from 'react';
import { rulesKey } from './keys';

export const useServerAbility = () => {
  const { data: rules, isLoading } = useQuery(
    rulesKey(),
    () => axiosInstance.get('/auth/rules'),
    {
      staleTime: 1000 * 5 * 60,
    }
  );
  const ability = useMemo(() => new AppAbility(rules ?? []), [rules]);
  return { ability, isLoading };
};
