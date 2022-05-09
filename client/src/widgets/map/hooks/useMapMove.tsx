/* eslint-disable @typescript-eslint/no-use-before-define */
import { Dispatch, useEffect, useRef } from 'react';
import { createVectorFromPoints } from 'shared/utils/vector';
import { selectMapTransform } from '../model/mapSelectors';
import { MapState, MoveMapAction } from '../model/MapState';
import { mapStateReducer } from '../model/mapStateReducer';

export const useMapMove = (
  mapState: MapState,
  onChangePosition: Dispatch<MoveMapAction>
) => {
  const mapMoveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = mapMoveRef.current;
    if (!map) return () => {};

    let isDrag = false;
    let mouseStart: Point = { x: 0, y: 0 };
    const calcMoveDelta = (e: MouseEvent) =>
      createVectorFromPoints(mouseStart, eventPoint(e));

    return addMoveHandlers(map, {
      onStart: (e) => {
        if (e.target !== map) return;
        isDrag = true;
        mouseStart = eventPoint(e);
      },
      onEnd: (e) => {
        if (!isDrag) return;
        isDrag = false;
        onChangePosition({
          type: 'moveMap',
          screenDelta: calcMoveDelta(e),
        });
      },
      onMove: (e) => {
        if (!isDrag) return;
        map.style.transform = selectMapTransform(
          mapStateReducer(mapState, {
            type: 'moveMap',
            screenDelta: calcMoveDelta(e),
          })
        );
      },
    });
  }, [mapMoveRef, mapState, onChangePosition]);

  return {
    mapMoveRef,
  };
};

const eventPoint = (e: MouseEvent): Point => ({ x: e.clientX, y: e.clientY });

const addMoveHandlers = (
  element: HTMLDivElement,
  handlers: {
    onStart: (e: MouseEvent) => void;
    onEnd: (e: MouseEvent) => void;
    onMove: (e: MouseEvent) => void;
  }
) => {
  element.addEventListener('mousedown', handlers.onStart);
  element.addEventListener('mouseup', handlers.onEnd);
  element.addEventListener('mousemove', handlers.onMove);
  return () => {
    element.removeEventListener('mousedown', handlers.onStart);
    element.removeEventListener('mouseup', handlers.onEnd);
    element.removeEventListener('mousemove', handlers.onMove);
  };
};
