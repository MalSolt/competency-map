export const toRelativeAngle = (point: Point, mapSize: number): Point => ({
  x: point.x + mapSize / 2,
  y: point.y + mapSize / 2,
});
