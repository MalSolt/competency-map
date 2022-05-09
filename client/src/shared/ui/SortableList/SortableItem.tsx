import { FC, useRef } from 'react';
import {
  DragLayerMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
  XYCoord,
} from 'react-dnd';
import Stack from '@mui/material/Stack';

type Props = {
  index: number;
  children: React.ReactNode;
  onOrderUpdate: (dragIndex: number, hoverIndex: number) => void;
  onDrop: () => void;
};

type DndItemProps = {
  index: number;
};

const SORTABLE_LIST_ITEM = 'SORTABLE_LIST_ITEM';

export const SortableItem: FC<Props> = ({
  index,
  onOrderUpdate,
  onDrop,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: SORTABLE_LIST_ITEM,
    hover(i: DndItemProps, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = i.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onOrderUpdate(dragIndex, hoverIndex);

      // eslint-disable-next-line no-param-reassign
      i.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: SORTABLE_LIST_ITEM,
    item: () => ({ index }),
    collect: (monitor: DragLayerMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      onDrop();
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <Stack
      ref={ref}
      sx={{
        opacity,
        width: '100%',
      }}
    >
      {children}
    </Stack>
  );
};
