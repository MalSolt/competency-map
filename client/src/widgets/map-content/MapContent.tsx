import { FC } from 'react';
import { PositionDto } from '@dto/competencyPosition';
import { MapContentItem } from './types';
import { MapArrows } from './MapArrows';
import { MapItem } from './MapItem';
import { useMapItemSizes } from './hooks/useMapItemSizes';

type Props<T extends { id: unknown }> = {
  renderContentItem: FC<MapContentItem<T>>;
  mapSize: number;
  items: T[];
  hiddenId?: T['id'];
};

export function MapContent<
  T extends { id: unknown; position: PositionDto; requirements: T[] }
>({ mapSize, renderContentItem, items, hiddenId }: Props<T>) {
  const { updateMapItemSizes, getMapItemSizes } = useMapItemSizes();

  return (
    <>
      <MapArrows<T>
        items={items.filter((item: T) => item.id !== hiddenId)}
        mapSize={mapSize}
        getMapItemSizes={getMapItemSizes}
      />
      {items.map((item: T) => (
        <MapItem<T>
          key={item.id as number}
          renderContent={renderContentItem}
          mapSize={mapSize}
          item={item}
          updateMapItemSizes={updateMapItemSizes}
        />
      ))}
    </>
  );
}
