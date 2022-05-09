import {
  CompetencyWithUserDto,
  CompetencyWithUserForMapDto,
} from '@dto/competency';
import styled from '@emotion/styled';
import { UserId } from '@kernel';
import { headerHeight } from 'app/ui/header';
import { useGetUserCompetencies } from 'controllers/user-competencies';
import React from 'react';
import { useHeaderTitle } from 'shared/lib/HeaderTitle/useHeaderTitle';
import { useParamId } from 'shared/lib/hooks/useParamId';
import { Map, useMap } from 'widgets/map';
import { MapContent } from 'widgets/map-content';
import { MapViewSettings } from 'widgets/map-view-settings';
import { useCompetenciesFilter } from 'shared/lib/hooks/useCompetenciesFilter';
import { MiniMap } from 'widgets/mini-map';
import { MapLayout } from 'shared/ui/layouts/MapLayout';
import { MapSidebar } from './components/MapSidebar';
import { UserCompetencyMapItem } from './components/UserCompetencyMapItem';

const defaultCompetencies = [] as CompetencyWithUserDto[];

export const UserMapPage = () => {
  useHeaderTitle('User competency map');
  const userId = useParamId<UserId>('id');
  const [mapState, dispatchMapAction] = useMap(`user-map-${userId}`);
  const userCompetenciesQuery = useGetUserCompetencies(userId);
  const competencies = userCompetenciesQuery.data ?? defaultCompetencies;
  const preparedCompetencies = competencies.filter(
    ({ position, requirements }: CompetencyWithUserDto) =>
      position && requirements
  ) as CompetencyWithUserForMapDto[];

  const competenciesFilters =
    useCompetenciesFilter<CompetencyWithUserForMapDto>(preparedCompetencies);

  return (
    <MapLayout>
      <MapSidebar
        viewSettings={
          <MapViewSettings
            filters={competenciesFilters.filters}
            competencies={competencies}
            onChangeMap={dispatchMapAction}
            changeFilters={competenciesFilters.changeFilters}
          />
        }
      />
      <StyledMap map={mapState} onChangeMap={dispatchMapAction}>
        <MapContent<CompetencyWithUserForMapDto>
          mapSize={mapState.size}
          renderContentItem={(props) => (
            <UserCompetencyMapItem
              {...props}
              userId={userId}
              asUser
              asTeacher
            />
          )}
          items={competenciesFilters.filteredCompetencies}
        />
      </StyledMap>
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
