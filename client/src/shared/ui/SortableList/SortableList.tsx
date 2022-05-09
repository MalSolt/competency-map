import { FC, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { SortableItem } from './SortableItem';

type T = any;

type Props = {
  items: T[];
  onOrderChange: (items: T[]) => void;
  renderItem: (item: T) => React.ReactNode;
};

export const SortableList: FC<Props> = ({
  items: initialItems,
  onOrderChange,
  renderItem,
}) => {
  const [items, setItems] = useState<Array<T>>(initialItems);

  useEffect(() => {
    setItems(initialItems);

    return () => setItems([]);
  }, [initialItems]);

  const handleDrop = () => {
    onOrderChange([...items]);
  };

  const handleOrderUpdate = (dragIndex: number, hoverIndex: number) => {
    const shallowCopyItems = [...items];
    const temporary = shallowCopyItems[hoverIndex];
    shallowCopyItems[hoverIndex] = shallowCopyItems[dragIndex];
    shallowCopyItems[dragIndex] = temporary;

    setItems(shallowCopyItems);
  };

  return (
    <Stack spacing={1}>
      {items.map((item: T, index: number) => (
        <SortableItem
          key={item.id}
          index={index}
          onOrderUpdate={handleOrderUpdate}
          onDrop={handleDrop}
        >
          {renderItem(item)}
        </SortableItem>
      ))}
    </Stack>
  );
};
