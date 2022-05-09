import React, { FC } from 'react';
import { CompetencyDto } from '@dto/competency';
import { CompetencyMapItem } from 'shared/ui/CompetencyMapItem';
import { MapContentItem } from 'widgets/map-content';
import { getCompetencyCardEditRoute } from 'shared/lib/routeBuilder';
import { CompetencyId } from '@kernel';
import Router from 'next/router';
import { useDraggableCompetency } from '../hooks/useDraggableCompetency';
import { MapItemToolbar } from './MapItemToolbar';

interface Props extends MapContentItem<CompetencyDto> {
  withoutToolbar?: boolean;
}

export const EditCompetencyMapItem: FC<Props> = ({
  withoutToolbar = false,
  item,
  style,
  updateMapItemSizes,
}) => {
  const [{ isDragging }, drag] = useDraggableCompetency(item);
  const competencyId = item.id as CompetencyId;

  const toEditCompetencyPage = () =>
    Router.push(getCompetencyCardEditRoute(competencyId));

  return (
    <>
      <CompetencyMapItem
        withoutToolbar={withoutToolbar}
        cardRef={drag}
        style={{
          opacity: isDragging ? 0 : 1,
          ...style,
        }}
        competency={item}
        toolbar={<MapItemToolbar item={item} />}
        updateMapItemSizes={updateMapItemSizes}
        onDoubleClick={toEditCompetencyPage}
      />
    </>
  );
};
