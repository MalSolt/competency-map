export const sumVectors = (...vectors: Vector[]): Vector =>
  vectors.reduce((v1, v2) => ({
    i: v1.i + v2.i,
    j: v1.j + v2.j,
  }));

export const reverseVector = ({ i, j }: Vector): Vector => ({ i: -i, j: -j });
export const scaleVector = ({ i, j }: Vector, scalar: number): Vector => ({
  i: i * scalar,
  j: j * scalar,
});

export const createVectorFromPoints = (start: Point, end: Point): Vector => ({
  i: end.x - start.x,
  j: end.y - start.y,
});

export const addVectorToPoint = ({ x, y }: Point, { i, j }: Vector) => ({
  x: x + i,
  y: y + j,
});

export const pointToVector = ({ x, y }: Point): Vector => ({ i: x, j: y });
