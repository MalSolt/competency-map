import { UsersPage } from 'pages/users/users.page';
import { createPageGuard } from 'shared/lib/ablity';
import { getHomeRoute } from 'shared/lib/routeBuilder';

const UsersGuard = createPageGuard(getHomeRoute(), (a) =>
  a.can('manage', 'Users')
);

// eslint-disable-next-line import/no-default-export
export default UsersGuard(UsersPage);
