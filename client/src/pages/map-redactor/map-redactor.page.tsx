import { FC } from 'react';
import styled from '@emotion/styled';
import { CompetencyDto, CompetencyForMapDto } from '@dto/competency';
import { headerHeight } from 'app/ui/header';
import { useHeaderTitle } from 'shared/lib/HeaderTitle/useHeaderTitle';
import { Map, useMap } from 'widgets/map';
import { useCompetenciesFilter } from 'shared/lib/hooks/useCompetenciesFilter';
import { MapContent } from 'widgets/map-content';
import { MapViewSettings } from 'widgets/map-view-settings';
import { MiniMap } from 'widgets/mini-map/MiniMap';
import { MapLayout } from 'shared/ui/layouts/MapLayout';
import { useGetCompetencies } from 'controllers/competencies';
import { AddVariantsList } from './components/AddVariantsList';
import { MapDragLayer } from './components/MapDragLayer';
import { useAddDropZone } from './hooks/useAddDropZone';
import { MapSidebar } from './components/MapSidebar';
import { EditCompetencyMapItem } from './components/EditCompetencyMapItem';

const defaultCompetencies = [] as CompetencyDto[];

export const MapRedactorPage: FC = () => {
  useHeaderTitle('Competency map');
  const [mapState, dispatchMapAction] = useMap('map-redactor');
  const competenciesQuery = useGetCompetencies();
  const competencies = competenciesQuery.data ?? defaultCompetencies;
  const [{ draggingItemId }, mapRef] = useAddDropZone(mapState);
  const preparedCompetencies = competencies.filter(
    ({ position, requirements }: CompetencyDto) => position && requirements
  ) as CompetencyForMapDto[];

  const competenciesFilters =
    useCompetenciesFilter<CompetencyForMapDto>(preparedCompetencies);

  return (
    <MapLayout>
      <MapSidebar
        actions={<AddVariantsList competencies={competencies} />}
        viewSettings={
          <MapViewSettings
            filters={competenciesFilters.filters}
            competencies={competencies}
            onChangeMap={dispatchMapAction}
            changeFilters={competenciesFilters.changeFilters}
          />
        }
      />
      <StyledMap mapRef={mapRef} map={mapState} onChangeMap={dispatchMapAction}>
        <MapContent<CompetencyForMapDto>
          hiddenId={draggingItemId}
          mapSize={mapState.size}
          renderContentItem={(props) => <EditCompetencyMapItem {...props} />}
          items={competenciesFilters.filteredCompetencies}
        />
      </StyledMap>
      <MapDragLayer scale={mapState.scale} />
      <MiniMap
        competencies={competenciesFilters.filteredCompetencies}
        mapState={mapState}
        onChangeMap={dispatchMapAction}
      />
    </MapLayout>
  );
};

const StyledMap = styled(Map)`
  height: calc(100vh - ${headerHeight}px);
`;
