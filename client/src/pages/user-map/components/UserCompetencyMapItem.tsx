import React, { CSSProperties, FC, Ref, ReactNode } from 'react';
import { CompetencyId, UserId } from '@kernel';
import { CompetencyDto, CompetencyWithUserDto } from '@dto/competency';
import { UpdateMapItemSizes } from 'widgets/map-content/types';
import { getCompetencyRoute } from 'shared/lib/routeBuilder';
import { CompetencyMapItem } from 'shared/ui/CompetencyMapItem';
import Router from 'next/router';
import { MapItemToolbar } from './MapItemToolBar';

export interface BoxProps {
  item: CompetencyDto &
    Pick<Partial<CompetencyWithUserDto>, 'userCompetencyInfo'>;
  style?: CSSProperties;
  cardRef?: Ref<HTMLDivElement>;
  updateMapItemSizes?: UpdateMapItemSizes<CompetencyId>;
  editButton?: ReactNode;
  asTeacher?: boolean;
  asUser?: boolean;
  userId?: UserId;
}

const STATUS_COLOR = {
  not_learned: 'transparent',
  learned: '#fff78c',
  in_progress: '#8aa9ff',
  confirmed: '#9eff91',
};

export const UserCompetencyMapItem: FC<BoxProps> = ({
  item,
  style,
  cardRef,
  updateMapItemSizes,
  userId,
  asTeacher,
  asUser,
}) => {
  const userInfo = item.userCompetencyInfo;
  const userInfoStatus = userInfo ? userInfo.status : 'not_learned';
  const statusColor = STATUS_COLOR[userInfoStatus];
  const competencyId = item.id as CompetencyId;

  const toViewCompetencyPage = () => {
    if (!userId) return;
    Router.push(getCompetencyRoute(userId, competencyId));
  };

  return (
    <CompetencyMapItem
      competency={item}
      style={style}
      cardRef={cardRef}
      updateMapItemSizes={updateMapItemSizes}
      toolbar={
        <MapItemToolbar
          userId={userId}
          asTeacher={asTeacher}
          asUser={asUser}
          item={item}
        />
      }
      color={statusColor}
      onClick={toViewCompetencyPage}
    />
  );
};
