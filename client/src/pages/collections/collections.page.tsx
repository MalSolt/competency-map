import { MaterialsCollectionId } from '@kernel';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { CollectionMaterials } from 'widgets/materials';
import { ContentLayout } from 'shared/ui/layouts/ContentLayout';

type Props = {};

export const CollectionsPage: FC<Props> = () => {
  const router = useRouter();
  const collectionIds = (router.query.params as string[]).map(
    (id) => Number(id) as MaterialsCollectionId
  );
  let collectionId = null;

  if (collectionIds.length) {
    collectionId = collectionIds[collectionIds.length - 1];
  }

  if (!collectionId) {
    return <span>error</span>;
  }

  return (
    <ContentLayout>
      <CollectionMaterials collectionId={collectionId} />
    </ContentLayout>
  );
};
