import { Dispatch, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import { MapState, SetScaleAction } from '../model/MapState';
import { mapStateReducer } from '../model/mapStateReducer';
import { selectMapTransform } from '../model/mapSelectors';

export const useMapScale = (
  mapState: MapState,
  onChangeScale: Dispatch<SetScaleAction>
) => {
  const mapScaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = mapScaleRef.current;
    if (!map) return () => {};

    let newScale = mapState.scale;

    const applyChanges = debounce(
      () =>
        onChangeScale({
          type: 'setScale',
          newScale,
        }),
      100
    );

    const updateScale = (s: number) => {
      newScale = s;
      map.style.transform = selectMapTransform(
        mapStateReducer(mapState, {
          type: 'setScale',
          newScale,
        })
      );
      applyChanges();
    };

    const onScale = (e: WheelEvent) => {
      const prev = newScale;
      if (e.deltaY > 0) {
        if (prev > 0.3) {
          updateScale(prev - 0.02);
        }
      } else if (prev < 2) {
        updateScale(prev + 0.02);
      }
    };

    map.addEventListener('wheel', onScale);
    return () => map.removeEventListener('wheel', onScale);
  }, [mapState, onChangeScale]);

  return {
    mapScaleRef,
  };
};
