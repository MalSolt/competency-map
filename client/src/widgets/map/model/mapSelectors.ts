import { reversePoint, scalePoint, sumPoints } from 'shared/utils/point';
import { reverseVector, addVectorToPoint } from 'shared/utils/vector';
import { MapState } from './MapState';

export const selectViewCenter = (mapState: MapState): Point => ({
  x: mapState.container.width / 2,
  y: mapState.container.height / 2,
});

export const selectViewPoint = (mapState: MapState, screenPoint: Point) =>
  addVectorToPoint(screenPoint, reverseVector(mapState.container.offset));

export const selectMapPoint = (mapState: MapState, screenPoint: Point) => {
  const viewPoint = selectViewPoint(mapState, screenPoint);
  const viewCenter = selectViewCenter(mapState);
  const viewPointRelativeCenter = sumPoints(
    viewPoint,
    reversePoint(viewCenter)
  );

  return addVectorToPoint(
    scalePoint(viewPointRelativeCenter, 1 / mapState.scale),
    reverseVector(mapState.move)
  );
};

export const selectMapTransform = ({
  container,
  size,
  move: { i, j },
  scale,
}: MapState) => {
  const halfSize = size / 2;
  const translateX = (i - halfSize) * scale + container.width / 2;
  const translateY = (j - halfSize) * scale + container.height / 2;

  return `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
};
