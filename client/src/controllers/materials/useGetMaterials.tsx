import { OwnerMaterialsCollectionId } from '@dto/materialsCollection';
import { CompetencyId } from '@kernel';
import { useQuery } from 'react-query';
import { axiosInstance } from 'shared/api/axiosInstance';
import { getMaterialsKey } from './keys';

export const useGetMaterials = (
  id: CompetencyId,
  ownerId: OwnerMaterialsCollectionId
) => {
  const res = useQuery(
    getMaterialsKey(id, ownerId),
    () =>
      axiosInstance.get(
        `/materials?competencyId=${id}&ownerCollectionId=${ownerId}`
      ),
    {
      enabled: !!id,
    }
  );

  return res;
};
