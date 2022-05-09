import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { UserDto } from '@dto/user';
import { useGetUsers } from 'controllers/users';
import { useHeaderTitle } from 'shared/lib/HeaderTitle/useHeaderTitle';
import { ContentLayout } from 'shared/ui/layouts/ContentLayout';
import { UserCard } from './partials/UserCard';

type Props = {};

export const UsersPage: FC<Props> = () => {
  useHeaderTitle('Все пользователи');

  const [search, setSearch] = useState<string>('');
  const query = useGetUsers();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredUsers = (query.data || []).filter(
    (user: UserDto) =>
      !search || user.telegram?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ContentLayout>
      <Typography variant="h4" component="div" sx={{ marginBottom: '24px' }}>
        Все пользователи
      </Typography>
      <Stack spacing={2} direction="row" sx={{ marginBottom: '12px' }}>
        <TextField
          label="Поиск"
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
          value={search}
          onChange={handleSearchChange}
          data-testid="user-search"
        />
      </Stack>
      {filteredUsers.length ? (
        <Grid spacing={2} data-testid="user-container" container>
          {filteredUsers.map((user: UserDto) => (
            <Grid key={user.id} xs={3} item>
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" sx={{ padding: '60px 0' }}>
          Список пуст
        </Typography>
      )}
    </ContentLayout>
  );
};
