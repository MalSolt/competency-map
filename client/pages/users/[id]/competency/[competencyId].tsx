import { subject } from '@casl/ability';
import { UserId } from '@kernel';
import { ViewCompetencyPage } from 'pages/view-competency';
import { createPageGuard } from 'shared/lib/ablity';
import { useParamId } from 'shared/lib/hooks/useParamId';
import { getHomeRoute } from 'shared/lib/routeBuilder';

const ViewCompetencyGuard = createPageGuard(getHomeRoute(), (a) => {
  const userId = useParamId<UserId>('id');
  return a.can('manage', subject('UserMap', { userId }));
});

// eslint-disable-next-line import/no-default-export
export default ViewCompetencyGuard(ViewCompetencyPage);
