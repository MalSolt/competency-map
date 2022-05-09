export const sumPoints = (...points: Point[]): Point =>
  points.reduce((v1, v2) => ({
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  }));

export const reversePoint = ({ x, y }: Point): Point => ({ x: -x, y: -y });
export const scalePoint = ({ x, y }: Point, scalar: number): Point => ({
  x: x * scalar,
  y: y * scalar,
});
