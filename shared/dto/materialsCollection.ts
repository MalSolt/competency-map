import { MaterialsCollectionId } from '../kernel';


export type MaterialsCollectionDto = {
  id: MaterialsCollectionId;
  title: string;
};

export type OwnerMaterialsCollectionId = MaterialsCollectionId | null;