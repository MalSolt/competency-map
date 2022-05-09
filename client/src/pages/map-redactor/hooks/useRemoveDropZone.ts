import { CompetencyDto } from '@dto/competency';
import { useDrop } from 'react-dnd';
import { useDeletePosition } from 'controllers/competencies';
import { COMPETENCY_ITEM } from '../constants';

export const useRemoveDropZone = () => {
  const deletePosition = useDeletePosition();

  const [, drop] = useDrop(() => ({
    accept: COMPETENCY_ITEM,
    drop(item: CompetencyDto) {
      const newItem: CompetencyDto = { ...item };
      newItem.position = undefined;
      deletePosition.mutate(item.id);
    },
  }));
  return drop;
};
