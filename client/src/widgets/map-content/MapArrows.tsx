/* eslint-disable react/no-unused-prop-types */
import { PositionDto } from '@dto/competencyPosition';
import React from 'react';
import { toRelativeAngle } from 'widgets/map';
import { Arrow } from './Arrow';
import { GetMapItemSizes } from './types';

type Props<T extends { id: unknown }> = {
  items: T[];
  mapSize: number;
  getMapItemSizes: GetMapItemSizes<T['id']>;
};

export function MapArrows<
  T extends { id: unknown; position: PositionDto; requirements: T[] }
>({ getMapItemSizes, items, mapSize }: Props<T>) {
  const arrows = items
    .map((box) => {
      const toId = box.id;
      const boxPosition = box.position;
      const boxRequirements = box.requirements;
      if (!boxPosition || !boxRequirements) return undefined;
      return boxRequirements
        .map(({ id }) => ({
          id,
          to: items.find((item) => item.id === id)?.position,
        }))
        .filter(isNotUndefined)
        .map(({ id, to }) => ({ fromId: id, toId, from: to, to: boxPosition }));
    })
    .filter(isNotUndefined)
    .flat()
    .map(({ fromId, toId, from, to }) =>
      from && to
        ? {
            fromId,
            toId,
            from: toRelativeAngle(from, mapSize),
            to: toRelativeAngle(to, mapSize),
          }
        : undefined
    )
    .filter(isNotUndefined)
    .map(({ fromId, toId, from, to }) => (
      <Arrow
        key={`${fromId}_${toId}`}
        fromSizes={getMapItemSizes(fromId)}
        toSizes={getMapItemSizes(toId)}
        from={from}
        to={to}
      />
    ));

  return (
    <svg
      style={{ position: 'absolute', pointerEvents: 'none' }}
      stroke="#555"
      width={`${mapSize}px`}
      height={`${mapSize}px`}
      viewBox={`0 0 ${mapSize} ${mapSize}`}
      preserveAspectRatio="none"
    >
      {arrows}
    </svg>
  );
}

function isNotUndefined<T>(item: T | undefined): item is T {
  return item !== undefined;
}
