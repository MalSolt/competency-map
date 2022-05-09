import { FC } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export const BackLink: FC = () => {
  const router = useRouter();

  return (
    <Box sx={{ marginBottom: '12px' }}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link component="button" variant="body2" onClick={() => router.back()}>
        Вернуться назад
      </Link>
    </Box>
  );
};
