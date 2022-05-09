import { FC } from 'react';
import { CompetencyId } from '@kernel';
import { useGetMaterials } from 'controllers/materials';
import { Materials } from './partials/Materials';

type Props = {
  competencyId: CompetencyId;
};

export const CompetencyRootMaterials: FC<Props> = ({ competencyId }) => {
  const queryMaterials = useGetMaterials(competencyId, null);

  if (queryMaterials.isError) {
    return <span>Error</span>;
  }

  return (
    <Materials
      materials={queryMaterials.data ?? []}
      loading={queryMaterials.isLoading || queryMaterials.isIdle}
      competencyId={competencyId}
    />
  );
};
