import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { KnowledgeDto } from '@dto/knowledge';
import { KnowledgeId } from '@kernel';
import { useGetKnowledgeList } from 'controllers/knowledge';
import { Modal } from 'shared/ui/Modal';
import { useModalState } from 'shared/lib/hooks/useModalState';

import { KnowledgeListSkeleton } from './partials/KnowledgeSkeleton';
import { KnowledgeCard } from './partials/KnowledgeCard';
import { KnowledgeCardNewForm } from './partials/KnowledgeCardNewForm';
import { KnowledgeCardEditForm } from './partials/KnowledgeCardEditForm';

type Props = {};

export const Knowledge: FC<Props> = () => {
  const knowledgeQuery = useGetKnowledgeList();
  const [search, setSearch] = useState<string>('');
  const {
    open: addModal,
    setOpen: handleOpenAddModal,
    setClose: handleCloseAddModal,
  } = useModalState();
  const {
    open: editModal,
    data: editKnowledgeId,
    setOpen: handleOpenEditModal,
    setClose: handleCloseEditModal,
  } = useModalState<KnowledgeId>();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredKnowledgeList = (knowledgeQuery.data || []).filter(
    (knowledge: KnowledgeDto) =>
      !search || knowledge.name.toLowerCase().includes(search.toLowerCase())
  );

  if (knowledgeQuery.isError) {
    return <span>Error</span>;
  }

  if (knowledgeQuery.isLoading) {
    return <KnowledgeListSkeleton />;
  }

  return (
    <>
      <Modal open={addModal} onClose={handleCloseAddModal}>
        <Typography variant="h4" component="div" sx={{ marginBottom: '24px' }}>
          Новая область знаний
        </Typography>
        <KnowledgeCardNewForm onFinish={handleCloseAddModal} />
      </Modal>
      <Modal open={editModal} onClose={handleCloseEditModal}>
        <Typography variant="h4" component="div" sx={{ marginBottom: '24px' }}>
          Редактировать область знаний
        </Typography>
        <KnowledgeCardEditForm
          knowledgeId={editKnowledgeId}
          onFinish={handleCloseEditModal}
        />
      </Modal>
      <Stack spacing={2} direction="row" sx={{ marginBottom: '12px' }}>
        <TextField
          label="Поиск"
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
          value={search}
          onChange={handleSearchChange}
        />
        <Button onClick={handleOpenAddModal} variant="contained">
          Добавить
        </Button>
      </Stack>
      {filteredKnowledgeList.length ? (
        <Grid spacing={2} container>
          {filteredKnowledgeList.map((knowledge: KnowledgeDto) => (
            <Grid key={knowledge.id} xs={3} item>
              <KnowledgeCard
                knowledge={knowledge}
                onEdit={handleOpenEditModal}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" sx={{ padding: '60px 0' }}>
          Список пуст
        </Typography>
      )}
    </>
  );
};
