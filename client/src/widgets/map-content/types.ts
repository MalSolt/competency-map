import { CSSProperties } from 'react';

export type MapContentItem<T extends { id: unknown }> = {
  item: T;
  style?: CSSProperties;
  updateMapItemSizes?: UpdateMapItemSizes<T['id']>;
};

export type BoxSizeWithId<T> = {
  id: T;
} & Sizes;


export type UpdateMapItemSizes<T> = (newMapItemSize: BoxSizeWithId<T>) => void;

export type GetMapItemSizes<T> = (id: T) => Sizes;
