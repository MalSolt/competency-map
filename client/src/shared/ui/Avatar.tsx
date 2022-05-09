import React from 'react';
import MUIAvatar from '@mui/material/Avatar';
import { useGetMe } from 'controllers/users';
import { useRedirectToMe } from 'shared/lib/hooks/useRedirectToMe';
import { stringAvatar } from 'shared/lib/stringAvatar';

export const Avatar = () => {
  const query = useGetMe();
  const redirectToMe = useRedirectToMe();
  const {
    logo,
    first_name: firstName,
    second_name: lastName,
  } = query.data ?? {};

  if (!logo) {
    return (
      <MUIAvatar
        {...stringAvatar(`${firstName} ${lastName}`)}
        onClick={redirectToMe}
      />
    );
  }
  return (
    <MUIAvatar
      alt="Avatar"
      src={logo}
      sx={{ cursor: 'pointer' }}
      onClick={redirectToMe}
    />
  );
};
