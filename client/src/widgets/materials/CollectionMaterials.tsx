import { FC } from 'react';
import { CompetencyId, MaterialsCollectionId } from '@kernel';
import { useParamId } from 'shared/lib/hooks/useParamId';
import { useGetMaterials } from 'controllers/materials';
import { Materials } from './partials/Materials';

type Props = {
  collectionId: MaterialsCollectionId;
};

export const CollectionMaterials: FC<Props> = ({ collectionId }) => {
  const competencyId = useParamId<CompetencyId>('competencyId');
  const queryMaterials = useGetMaterials(competencyId, collectionId);

  if (queryMaterials.isError || !competencyId) {
    return <span>Error</span>;
  }

  return (
    <Materials
      loading={queryMaterials.isLoading || queryMaterials.isIdle}
      materials={queryMaterials.data || []}
      competencyId={competencyId}
      collectionId={collectionId}
    />
  );
};
