import { CollectionsPage } from 'pages/collections/collections.page';
import { createPageGuard } from 'shared/lib/ablity';
import { getHomeRoute } from 'shared/lib/routeBuilder';

const CollectionsGuard = createPageGuard(getHomeRoute(), (a) =>
  a.can('update', 'Collections')
);

// eslint-disable-next-line import/no-default-export
export default CollectionsGuard(CollectionsPage);
