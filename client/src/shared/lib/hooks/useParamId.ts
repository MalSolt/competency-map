import { Brand } from '@kernel';
import { useRouter } from 'next/router';

export const useParamId = <T extends Brand<number, string>>(idKey: string) => {
  const router = useRouter();
  const strId = router.query[idKey];
  if (!strId) throw new Error('Не передан id в url');
  return Number(strId) as T;
};
