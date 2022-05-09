export type MapContainerState = {
  width: number;
  height: number;
  offset: Vector;
};

export type MapState = {
  container: MapContainerState;
  move: Vector;
  scale: number;
  size: number;
};

export type SetContainerAction = {
  type: 'setContainer';
  container: MapContainerState;
};

export type SetScaleAction = {
  type: 'setScale';
  newScale: number;
};

export type MoveMapAction = { type: 'moveMap'; screenDelta: Vector };
export type MoveToPointAction = { type: 'moveToPoint'; point: Point };

export type MapStateActions =
  | SetContainerAction
  | SetScaleAction
  | MoveMapAction
  | MoveToPointAction;
