import {
  pointToVector,
  reverseVector,
  scaleVector,
  sumVectors,
} from 'shared/utils/vector';
import { MapState, MapStateActions } from './MapState';

export const mapStateReducer = (
  mapState: MapState,
  action: MapStateActions
): MapState => {
  if (action.type === 'setContainer') {
    return { ...mapState, container: action.container };
  }
  if (action.type === 'moveMap') {
    return {
      ...mapState,
      move: sumVectors(
        mapState.move,
        scaleVector(action.screenDelta, 1 / mapState.scale)
      ),
    };
  }
  if (action.type === 'setScale') {
    return { ...mapState, scale: action.newScale };
  }
  if (action.type === 'moveToPoint') {
    return { ...mapState, move: reverseVector(pointToVector(action.point)) };
  }
  return mapState;
};
