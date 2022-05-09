import React, { FC } from 'react';
import { CompetencyDto } from '@dto/competency';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useBooleanState } from 'shared/lib/hooks/useBooleanState';
import { CompetencyEditModal } from 'widgets/newedit-competency';

interface Props {
  item: CompetencyDto;
}

export const MapItemToolbar: FC<Props> = ({ item }) => {
  const { state: isEditMode, setTrue, setFalse } = useBooleanState();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setTrue();
  };

  return (
    <>
      <IconButton onClick={openModal} color="default" size="small">
        <EditIcon />
      </IconButton>
      <CompetencyEditModal
        competency={item}
        open={isEditMode}
        onClose={setFalse}
      />
    </>
  );
};
