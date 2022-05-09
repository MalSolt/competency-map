import { useRouter } from 'next/router';
import { getUserRoute } from 'shared/lib/routeBuilder';
import { useGetMe } from 'controllers/users';

export const useRedirectToMe = () => {
  const router = useRouter();
  const me = useGetMe();

  return () => {
    if (!me.data) return;
    router.push(getUserRoute(me.data.id));
  };
};
