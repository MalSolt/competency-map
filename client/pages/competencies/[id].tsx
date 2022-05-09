import { EditCompetencyPage } from 'pages/competencies/edit.page';
import { createPageGuard } from 'shared/lib/ablity';
import { getHomeRoute } from 'shared/lib/routeBuilder';

const EditCompetencyGuard = createPageGuard(getHomeRoute(), (a) =>
  a.can('update', 'Competency')
);

// eslint-disable-next-line import/no-default-export
export default EditCompetencyGuard(EditCompetencyPage);
