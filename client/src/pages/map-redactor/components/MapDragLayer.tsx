import React, { CSSProperties, FC, memo } from 'react';
import { XYCoord, useDragLayer } from 'react-dnd';
import { CompetencyMapItem } from 'shared/ui/CompetencyMapItem';
import { COMPETENCY_ITEM } from '../constants';

interface Props {
  scale: number;
}

export const MapDragLayer: FC<Props> = memo(({ scale }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  const renderItem = () => {
    switch (itemType) {
      case COMPETENCY_ITEM:
        return (
          <CompetencyMapItem
            competency={item}
            style={getCompetencyStyles(scale)}
          />
        );
      default:
        return null;
    }
  };

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
});

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  right: 0,
  bottom: 0,
  width: '100%',
  height: `100%`,
  overflow: 'hidden',
};

const getItemStyles = (
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
): CSSProperties => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
  };
};

const getCompetencyStyles = (scale: number): CSSProperties => {
  const transform = `scale(${scale})`;

  return {
    transform,
    transformOrigin: 'left top',
  };
};
