import { useEffect } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { CompetencyDto } from '@dto/competency';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { COMPETENCY_ITEM } from '../constants';

export function useDraggableCompetency(box: CompetencyDto) {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: COMPETENCY_ITEM,
      item: box,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [box]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return [{ isDragging }, drag] as const;
}
