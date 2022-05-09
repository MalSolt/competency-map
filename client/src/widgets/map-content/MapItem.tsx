import { PositionDto } from '@dto/competencyPosition';
import { ReactNode } from 'react';
import { toRelativeAngle } from 'widgets/map/lib/toRelativeAngle';
import { MapContentItem, UpdateMapItemSizes } from './types';

type Props<T extends { id: unknown }> = {
  renderContent: (content: MapContentItem<T>) => ReactNode;
  item: T;
  mapSize: number;
  updateMapItemSizes: UpdateMapItemSizes<T['id']>;
};

export function MapItem<T extends { id: unknown; position: PositionDto }>({
  item,
  renderContent,
  mapSize,
  updateMapItemSizes,
}: Props<T>) {
  const { position } = item;
  if (!position) return null;
  const { x, y } = toRelativeAngle(position, mapSize);

  const transform = `translate(${x}px, ${y}px)`;
  return (
    <>
      {renderContent({
        item,
        style: { transform, position: 'absolute', zIndex: 10 },
        updateMapItemSizes,
      })}
    </>
  );
}
