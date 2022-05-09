import { subject } from '@casl/ability';
import { UserId } from '@kernel';
import { UserMapPage } from 'pages/user-map';
import { createPageGuard } from 'shared/lib/ablity';
import { useParamId } from 'shared/lib/hooks/useParamId';
import { getHomeRoute } from 'shared/lib/routeBuilder';

const UserMapGuard = createPageGuard(getHomeRoute(), (a) => {
  const userId = useParamId<UserId>('id');
  return a.can('manage', subject('UserMap', { userId }));
});

// eslint-disable-next-line import/no-default-export
export default UserMapGuard(UserMapPage);
