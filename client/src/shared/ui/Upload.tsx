import { LoadingButton } from '@mui/lab';
import React, { FC } from 'react';

type Props = {
  children: React.ReactNode;
  accept?: string;
  disabled?: boolean;
  loading?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Upload: FC<Props> = ({
  children,
  accept,
  disabled = false,
  loading = false,
  onChange,
}) => (
  <LoadingButton
    variant="text"
    component="label"
    disabled={disabled || loading}
    loading={loading}
  >
    {children}
    <input
      type="file"
      hidden
      accept={accept}
      disabled={disabled || loading}
      onChange={onChange}
    />
  </LoadingButton>
);
