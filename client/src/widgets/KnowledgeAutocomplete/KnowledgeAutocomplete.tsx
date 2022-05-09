import { KnowledgeId } from '@kernel';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useGetKnowledgeList } from 'controllers/knowledge';
import React, { CSSProperties, FC } from 'react';

interface Props {
  sx?: CSSProperties;
  fullWidth?: boolean;
  label?: string;
  value: KnowledgeId[] | undefined;
  onChange: (ids: KnowledgeId[]) => void;
}

export const KnowledgeAutocomplete: FC<Props> = ({
  sx,
  fullWidth = false,
  label = '',
  value = [],
  onChange,
}) => {
  const knowledgeQuery = useGetKnowledgeList();
  const knowledgeList = knowledgeQuery.data ?? [];

  const getknowledgeValue = () => {
    if (!value.length) return undefined;
    const targetElem = knowledgeList.filter((e) => value.includes(e.id));
    if (targetElem.length) {
      return targetElem.map((elem) => ({
        id: elem?.id,
        label: elem?.name,
      }));
    }
    return undefined;
  };

  return (
    <Autocomplete
      sx={sx}
      value={getknowledgeValue()}
      disablePortal
      options={knowledgeList.map((knowledge) => ({
        id: knowledge.id,
        label: knowledge.name,
      }))}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(_, newValue) => {
        onChange(newValue.map((e) => e.id));
      }}
      fullWidth={fullWidth}
      multiple
    />
  );
};
