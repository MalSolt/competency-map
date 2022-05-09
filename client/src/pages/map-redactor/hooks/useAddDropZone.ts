import { CompetencyDto } from '@dto/competency';
import { CompetencyId } from '@kernel';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { MapState } from 'widgets/map/model/MapState';
import { selectMapPoint } from 'widgets/map';
import { useUpsertPosition } from 'controllers/competencies';
import { COMPETENCY_ITEM } from '../constants';

export const useAddDropZone = (mapState: MapState) => {
  const upsertPosition = useUpsertPosition();

  const [{ draggingItemId }, drop] = useDrop(
    () => ({
      accept: COMPETENCY_ITEM,
      collect: (monitor: DropTargetMonitor<{ id: CompetencyId }>) => ({
        draggingItemId: monitor.getItem()?.id,
      }),
      drop(item: CompetencyDto, monitor) {
        const clientOffset = monitor.getSourceClientOffset();
        if (!clientOffset) return;

        upsertPosition.mutate({
          id: item.id,
          position: selectMapPoint(mapState, clientOffset),
        });
      },
    }),
    [mapState]
  );

  return [{ draggingItemId }, drop] as const;
};
