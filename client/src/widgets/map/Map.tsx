import { Dispatch, FC, Ref } from 'react';
import styled from '@emotion/styled';
import { useMergeRefs } from 'shared/lib/hooks/useMergeRefs';
import { MapState, MapStateActions } from './model/MapState';
import { useMapMove } from './hooks/useMapMove';
import { useMapScale } from './hooks/useMapScale';
import { useMapWrapperParams } from './hooks/useMapWrapperParams';
import { selectMapTransform } from './model/mapSelectors';

export type MapProps = {
  mapRef?: Ref<HTMLDivElement>;
  mapInnerRef?: Ref<HTMLDivElement>;
  map: MapState;
  onChangeMap: Dispatch<MapStateActions>;
  className?: string;
};

export const Map: FC<MapProps> = ({
  children,
  mapRef,
  mapInnerRef,
  map,
  onChangeMap,
  className,
}) => {
  const { wrapperParamsRef } = useMapWrapperParams(onChangeMap);
  const { mapScaleRef } = useMapScale(map, onChangeMap);
  const { mapMoveRef } = useMapMove(map, onChangeMap);

  return (
    <MapWrapper
      className={className}
      ref={useMergeRefs(mapRef, wrapperParamsRef)}
    >
      <MapInner
        ref={useMergeRefs(mapInnerRef, mapScaleRef, mapMoveRef)}
        style={{
          width: map.size,
          height: map.size,
          transform: selectMapTransform(map),
        }}
      >
        {children}
      </MapInner>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  position: relative;
  padding: 0;
  overflow: hidden;
`;

const MapInner = styled.div`
  will-change: transform;
  background-size: 60px 60px;
  background-color: #fff;
  transform-origin: top left;
  background-image: linear-gradient(to right, #f0eeee 1px, transparent 1px),
    linear-gradient(to bottom, #f0eeee 1px, transparent 1px);
`;
