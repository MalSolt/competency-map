import { EditLessonPage } from 'pages/lessons/edit.page';
import { createPageGuard } from 'shared/lib/ablity';
import { getHomeRoute } from 'shared/lib/routeBuilder';

const EditLessonGuard = createPageGuard(getHomeRoute(), (a) =>
  a.can('manage', 'Lessons')
);

// eslint-disable-next-line import/no-default-export
export default EditLessonGuard(EditLessonPage);
