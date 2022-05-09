import { FC } from 'react';
import Router, { useRouter } from 'next/router';
import { getLoginRoute } from 'shared/lib/routeBuilder';
import { useGetMe } from 'controllers/users/useGetMe';

type Props = {
  children: any;
};

export const UserDataWrapper: FC<Props> = ({ children }) => {
  const { data: me, isLoading, isFetched } = useGetMe();
  const router = useRouter();
  const loginRoute = getLoginRoute();

  if (isLoading) {
    return null;
  }

  if (isFetched && !me && router.route !== loginRoute) {
    Router.push(loginRoute);
    return null;
  }

  if (isFetched && me && router.route === loginRoute) {
    Router.push('/');
    return children;
  }

  return children;
};
