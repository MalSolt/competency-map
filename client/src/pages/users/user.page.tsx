import React, { FC } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { Role, UserId } from '@kernel';
import { getUserCompetencyMapRoute } from 'shared/lib/routeBuilder';
import { Link } from 'shared/ui/Link';
import { useGetUser } from 'controllers/users';
import { ROLES_LIST, ROLES } from 'shared/constants/roles';
import { useHeaderTitle } from 'shared/lib/HeaderTitle/useHeaderTitle';
import { Can } from 'shared/lib/ablity';
import { useParamId } from 'shared/lib/hooks/useParamId';
import { ContentLayout } from 'shared/ui/layouts/ContentLayout';
import { useChangeRole } from './hooks/useChangeRole';

type Props = {};

export const UserPage: FC<Props> = () => {
  const userId = useParamId<UserId>('id');
  const query = useGetUser(userId);
  const user = query.data;
  const { setRole } = useChangeRole();

  const userTitle =
    query.isLoading || query.isIdle
      ? 'Иноформация пользовтеля'
      : `${user?.first_name} ${user?.second_name}`;

  useHeaderTitle(userTitle);

  const handleRoleChange = (e: SelectChangeEvent<Role>) => {
    if (!userId) {
      return;
    }

    setRole(userId, e.target.value as Role);
  };

  return (
    <ContentLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{
          margin: '24px',
        }}
      >
        {userTitle}
      </Typography>
      {query.isLoading || query.isIdle ? (
        <div>loading..</div>
      ) : (
        <Stack spacing={2} direction="column" sx={{ margin: '12px' }}>
          <Avatar
            alt="Avatar"
            src={user?.logo}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="body1">
            ФИО: {`${user?.first_name} ${user?.second_name}`}
          </Typography>
          <Typography variant="body1">telegram: {user?.telegram}</Typography>

          <Can I="update" a="User">
            <Select
              value={user?.role}
              onChange={handleRoleChange}
              label="Роль"
              size="small"
              sx={{ width: 240 }}
            >
              {ROLES_LIST.map((r) => (
                <MenuItem key={r} value={r}>
                  {ROLES[r]}
                </MenuItem>
              ))}
            </Select>
          </Can>

          <Link href={getUserCompetencyMapRoute(userId)}>
            Карта компетенций пользователя
          </Link>
        </Stack>
      )}
    </ContentLayout>
  );
};
