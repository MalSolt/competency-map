import { subject } from '@casl/ability';
import { UserId } from '@kernel';
import { UserPage } from 'pages/users/user.page';
import { createPageGuard } from 'shared/lib/ablity';
import { useParamId } from 'shared/lib/hooks/useParamId';
import { getHomeRoute } from 'shared/lib/routeBuilder';

  const UserGuard = createPageGuard(getHomeRoute(), (a) => {
    const id = useParamId<UserId>('id');
    return a.can('manage', subject('User', { id }));
  });

// eslint-disable-next-line import/no-default-export
export default UserGuard(UserPage);
