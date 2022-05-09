import { CompetencyDto, CompetencyWithUserDto } from '@dto/competency';
import { UserId } from '@kernel';
import { FC } from 'react';
import { MenuProgress } from './MenuProgress';

interface Props {
  item: CompetencyDto &
    Pick<Partial<CompetencyWithUserDto>, 'userCompetencyInfo'>;
  asTeacher?: boolean;
  asUser?: boolean;
  userId?: UserId;
}

export const MapItemToolbar: FC<Props> = ({ userId, asTeacher, asUser, item }) => {
  const userInfo = item.userCompetencyInfo;
  const userInfoStatus = userInfo ? userInfo.status : 'not_learned';

  if (!userId || !asTeacher || !asUser) {
    return <></>;
  }

  return (
    <MenuProgress
      competencyId={item.id}
      userId={userId}
      userInfoStatus={userInfoStatus}
    />
  );
};
