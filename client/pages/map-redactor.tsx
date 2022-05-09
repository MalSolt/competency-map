import { MapRedactorPage } from 'pages/map-redactor';
import { createPageGuard } from 'shared/lib/ablity';
import { getHomeRoute } from 'shared/lib/routeBuilder';

const MapRedactorGuard = createPageGuard(getHomeRoute(), (a) =>
  a.can('update', 'Competency')
);
// eslint-disable-next-line import/no-default-export
export default MapRedactorGuard(MapRedactorPage);
