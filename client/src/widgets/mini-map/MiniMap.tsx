import { CompetencyDto } from '@dto/competency';
import styled from '@emotion/styled';
import React, { useEffect, useRef, FC, memo, Dispatch } from 'react';
import { MapState, MapStateActions } from 'widgets/map';
import { MINIMAP_COMPETENCY_SIZE, MINIMAP_SIZE } from './constants';
import {
  getMinimapCompetencyPosition,
  getMapTrueOffset,
  getMinimapScale,
  getMinimapMove,
  getMinimapVisiblePart,
} from './helpers';

interface Props {
  competencies: CompetencyDto[];
  mapState: MapState;
  onChangeMap: Dispatch<MapStateActions>;
}

export const MiniMap: FC<Props> = memo(
  ({ competencies, mapState, onChangeMap }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const context = contextRef.current;
    const mapCompetencies = competencies.filter(
      (competency) => competency.position
    );

    const minimapScale = getMinimapScale(mapState.size);
    const minimapMove = getMinimapMove(minimapScale, mapState.move);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = MINIMAP_SIZE;
      canvas.height = MINIMAP_SIZE;
      contextRef.current = canvas.getContext('2d');
    }, []);

    const handleMapClick = ({
      nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement>) => {
      const { offsetX, offsetY } = nativeEvent;
      const { x, y } = getMapTrueOffset(minimapScale, {
        x: offsetX,
        y: offsetY,
      });

      onChangeMap({ type: 'moveToPoint', point: { x, y } });
    };

    const Drawing = () => {
      if (!context) return;

      context.clearRect(0, 0, MINIMAP_SIZE, MINIMAP_SIZE);

      mapCompetencies.forEach((competency) => {
        if (!competency.position) return;

        const { x, y } = getMinimapCompetencyPosition(
          minimapScale,
          competency.position
        );
        context.fillStyle = 'red';
        context.fillRect(
          x,
          y,
          MINIMAP_COMPETENCY_SIZE,
          MINIMAP_COMPETENCY_SIZE
        );

        const { rectX, rectY, rectWidth, rectHeight } = getMinimapVisiblePart({
          minimapMove,
          mapScale: mapState.scale,
          mapSize: mapState.size,
          mapContainerSize: mapState.container,
        });
        context.strokeRect(rectX, rectY, rectWidth, rectHeight);
      });
    };

    Drawing();

    return <Canvas onClick={handleMapClick} ref={canvasRef} />;
  }
);

const Canvas = styled.canvas`
  position: absolute;
  right: 10px;
  background: rgba(190, 190, 190, 0.7);
  cursor: pointer;
`;
