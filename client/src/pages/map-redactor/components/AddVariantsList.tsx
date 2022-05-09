import React, { FC, memo } from 'react';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { CompetencyDto } from '@dto/competency';
import { useCompetenciesFilter } from 'shared/lib/hooks/useCompetenciesFilter';
import { EditCompetencyMapItem } from './EditCompetencyMapItem';
import { useRemoveDropZone } from '../hooks/useRemoveDropZone';

interface FilterContainerProps {
  competencies: CompetencyDto[];
}

export const AddVariantsList: FC<FilterContainerProps> = memo(
  ({ competencies }) => {
    const drop = useRemoveDropZone();

    const { filters, changeFilters, filteredCompetencies } =
      useCompetenciesFilter(competencies, {
        withPosition: false,
      });

    return (
      <>
        {filteredCompetencies.length || filters.title ? (
          <TextField
            sx={{ mb: '1em' }}
            size="small"
            label="Фильтр названию"
            placeholder="Введите название"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            value={filters.title}
            onChange={(e) => changeFilters({ title: e.target.value })}
          />
        ) : (
          <Stack direction="row" justifyContent="center">
            Список пуст
          </Stack>
        )}

        <List
          style={{
            maxHeight: '70vh',
            minHeight: '400px',
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
          ref={drop}
        >
          {filteredCompetencies.map((competency) => (
            <ListItem
              key={competency.id}
              sx={{ position: 'relative', minHeight: '50px' }}
            >
              <EditCompetencyMapItem withoutToolbar item={competency} />
            </ListItem>
          ))}
        </List>
      </>
    );
  }
);
