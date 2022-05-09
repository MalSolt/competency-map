import { KnowledgePage } from 'pages/knowledge/knowledge.page';
import { createPageGuard } from 'shared/lib/ablity';
import { getHomeRoute } from 'shared/lib/routeBuilder';

const KnowledgeGuard = createPageGuard(getHomeRoute(), (a) =>
  a.can('manage', 'Knowledge')
);

// eslint-disable-next-line import/no-default-export
export default KnowledgeGuard(KnowledgePage);
