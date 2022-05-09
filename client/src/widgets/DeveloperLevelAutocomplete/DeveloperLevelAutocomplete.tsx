import React, { CSSProperties, FC } from 'react';
import { DeveloperLevelId } from '@kernel';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useGetDeveloperLevels } from 'controllers/developerLevels';

interface Props {
  sx?: CSSProperties;
  fullWidth?: boolean;
  label?: string;
  value: DeveloperLevelId | undefined;
  onChange: (id: DeveloperLevelId | undefined) => void;
}

export const DeveloperLevelAutocomplete: FC<Props> = ({
  sx,
  fullWidth = false,
  label = '',
  value,
  onChange,
}) => {
  const developerLevelsQuery = useGetDeveloperLevels();
  const developerLevelsList = developerLevelsQuery.data ?? [];

  const getDeveloperLevelValue = () => {
    const targetElem = developerLevelsList.find((e) => e.id === value);
    if (targetElem) return { id: targetElem?.id, label: targetElem?.name };

    return undefined;
  };

  return (
    <Autocomplete
      sx={sx}
      value={getDeveloperLevelValue()}
      disablePortal
      options={developerLevelsList.map((developerLevel) => ({
        id: developerLevel.id,
        label: developerLevel.name,
      }))}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(_, newValue) => {
        onChange(newValue?.id);
      }}
      fullWidth={fullWidth}
    />
  );
};
