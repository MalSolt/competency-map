import { OwnerMaterialsCollectionId } from '@dto/materialsCollection';
import { CompetencyId } from '@kernel';

export const materialsBaseKey = 'materials';

export const getMaterialsKey = (
  id: CompetencyId,
  ownerId: OwnerMaterialsCollectionId
) => [materialsBaseKey, { id, ownerId }];

