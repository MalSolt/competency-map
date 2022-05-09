import { useState, useCallback } from "react";
import { BoxSizeWithId, GetMapItemSizes, UpdateMapItemSizes } from '../types';

type MapItemSizes<T> = {
  [key: string]: BoxSizeWithId<T>;
}

export const useMapItemSizes = <T>() => {
  const [mapItemSizes, setMapItemSizes] = useState<MapItemSizes<T>>({});

  const updateMapItemSizes: UpdateMapItemSizes<T> = useCallback(
    (newItemSize) => {
      const id = newItemSize.id as unknown as string;

        setMapItemSizes((prevState) => ({
          ...prevState,
          [id]: { ... newItemSize },
        }))
    },
    []
  );

  const getMapItemSizes: GetMapItemSizes<T> = useCallback(
    (id) => {
      const mapItemSize = mapItemSizes[id as unknown as string];

      if (!mapItemSize) {
        return {
          width: 0,
          height: 0,
        };
      }

      return {
        width: mapItemSize.width,
        height: mapItemSize.height,
      };
    },
    [mapItemSizes]
  );


  return {
    mapItemSizes,
    updateMapItemSizes,
    getMapItemSizes,
  }
}
