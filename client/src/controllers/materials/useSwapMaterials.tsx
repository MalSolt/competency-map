import { useMutation, useQueryClient } from 'react-query';
import { SwapCollectionDto } from '@dto/material';

import { axiosInstance } from 'shared/api/axiosInstance';
import { CompetencyId } from '@kernel';
import { OwnerMaterialsCollectionId } from '@dto/materialsCollection';
import { getMaterialsKey } from './keys';

type MutationProps = {
  swapCollection: SwapCollectionDto;
};

export const useSwapMaterials = (
  competencyId: CompetencyId,
  ownerId: OwnerMaterialsCollectionId
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ swapCollection }: MutationProps) =>
      axiosInstance.put(`/materials/orders/`, swapCollection),
    {
      onSuccess: () => {},
      onError: () => {},
      onSettled: () => {
        queryClient.invalidateQueries(getMaterialsKey(competencyId, ownerId));
      },
    }
  );

  return mutation;
};
