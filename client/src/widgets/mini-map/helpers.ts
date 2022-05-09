import { PositionDto } from '@dto/competencyPosition';
import { MINIMAP_SIZE } from './constants';

export const getMinimapScale = (mapSize: number) => mapSize / MINIMAP_SIZE;

export const getMinimapCompetencyPosition = (
  minimapScale: number,
  position: PositionDto
) => {
  const x = Number(position?.x) / minimapScale + MINIMAP_SIZE / 2;
  const y = Number(position?.y) / minimapScale + MINIMAP_SIZE / 2;
  return { x, y };
};

export const getMapTrueOffset = (minimapScale: number, offset: PositionDto) => {
  const x = (offset.x - MINIMAP_SIZE / 2) * minimapScale;
  const y = (offset.y - MINIMAP_SIZE / 2) * minimapScale;
  return { x, y };
};

export const getMinimapMove = (minimapScale: number, mapMove: Vector) => {
  const x = MINIMAP_SIZE / 2 - mapMove.i / minimapScale;
  const y = MINIMAP_SIZE / 2 - mapMove.j / minimapScale;
  return { x, y };
};

export const getMinimapVisiblePart = ({
  minimapMove,
  mapScale,
  mapSize,
  mapContainerSize,
}: {
  minimapMove: PositionDto;
  mapScale: number;
  mapSize: number;
  mapContainerSize: Sizes;
}) => {
  const rectWidth =
    ((mapContainerSize.width / mapSize) * MINIMAP_SIZE) / mapScale;
  const rectHeight =
    ((mapContainerSize.height / mapSize) * MINIMAP_SIZE) / mapScale;

  const rectX = minimapMove.x - rectWidth / 2;
  const rectY = minimapMove.y - rectHeight / 2;

  return { rectX, rectY, rectWidth, rectHeight };
};
