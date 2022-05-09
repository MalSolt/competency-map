import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { CompetencyId, MaterialId } from '@kernel';
import { MaterialContentType, MaterialWithContentTypeDto } from '@dto/material';
import { OwnerMaterialsCollectionId } from '@dto/materialsCollection';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useSwapMaterials } from 'controllers/materials';
import { BackLink } from 'shared/ui/BackLink';
import { SortableList } from 'shared/ui/SortableList';
import { Modal } from 'shared/ui/Modal';
import { getCollectionRoute, getLessonRoute } from 'shared/lib/routeBuilder';

import { CompetencyMaterialsSkeleton } from './partials/CompetencyMaterialsSkeleton';
import { MaterialRemoveConfirm } from './partials/MaterialRemoveConfirm';
import { MaterialCreateForm } from './partials/MaterialCreateForm';

type Props = {
  competencyId: CompetencyId;
  materials: MaterialWithContentTypeDto[];
  loading?: boolean;
  collectionId?: OwnerMaterialsCollectionId;
};

type CreateMode = {
  open: boolean;
  type: MaterialContentType | null;
};

type DeleteMode = CreateMode & {
  materialId: MaterialId | null;
  title: string | null;
};

export const Materials: FC<Props> = ({
  competencyId,
  materials,
  loading = false,
  collectionId = null,
}) => {
  const router = useRouter();
  const swapMutation = useSwapMaterials(competencyId, collectionId);
  const [creatingMode, setCreatingMode] = useState<CreateMode>({
    open: false,
    type: null,
  });
  const [deleteMode, setDeleteMode] = useState<DeleteMode>({
    open: false,
    materialId: null,
    title: null,
    type: null,
  });

  const handleCloseCreateMode = () => {
    setCreatingMode((prevState) => ({
      open: false,
      type: prevState.type,
    }));
  };

  const handleOpenCreateMode = (type: MaterialContentType) => {
    setCreatingMode({
      open: true,
      type,
    });
  };

  const handleOpenDeleteMode = (materialId: MaterialId) => {
    const idx = materials.findIndex(
      (m: MaterialWithContentTypeDto) => m.id === materialId
    );

    if (idx === -1) {
      return;
    }

    const material: MaterialWithContentTypeDto = materials[idx];

    setDeleteMode({
      open: true,
      materialId: material.id,
      title: material.title,
      type: material.contentType,
    });
  };

  const handleCloseDeleteMode = () => {
    setDeleteMode({
      open: false,
      materialId: null,
      title: null,
      type: null,
    });
  };

  const handleMaterialsOrdersChange = (items: MaterialWithContentTypeDto[]) => {
    const swapCollection = items.map(
      (material: MaterialWithContentTypeDto) => material.id
    );
    swapMutation.mutate({ swapCollection });
  };

  const handleMaterialClick = (material: MaterialWithContentTypeDto) => {
    if (material.contentType === 'lesson') {
      router.push(getLessonRoute(material.lesson.id, competencyId));
    } else if (material.contentType === 'collection') {
      const params = router.query.params as string[];
      let tree = '';
      if (params) {
        tree = `${params.join('/')}/`;
      }

      router.push(
        getCollectionRoute(`${tree}${material.collection.id}`, competencyId)
      );
    }
  };

  return (
    <Box>
      <MaterialRemoveConfirm
        materialId={deleteMode.materialId}
        type={deleteMode.type}
        title={deleteMode.title}
        open={deleteMode.open}
        onClose={handleCloseDeleteMode}
      />
      <Modal
        open={creatingMode.open}
        onClose={handleCloseCreateMode}
        withoutCloseIcon
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ marginBottom: '24px' }}
          align="center"
        >
          {creatingMode.type === 'lesson' && 'Создание нового урока'}
          {creatingMode.type === 'collection' && 'Создание новой коллекции'}
        </Typography>
        <MaterialCreateForm
          contentType={creatingMode.type}
          competencyId={competencyId}
          collectionId={collectionId}
          onClose={handleCloseCreateMode}
        />
      </Modal>
      <BackLink />
      <Typography variant="h4" component="div" sx={{ marginBottom: '16px' }}>
        Обучающие материалы
      </Typography>
      <Box sx={{ width: 400 }}>
        {loading ? (
          <CompetencyMaterialsSkeleton />
        ) : (
          <>
            <Stack spacing={1} direction="row" sx={{ marginBottom: '8px' }}>
              <Button
                variant="text"
                size="small"
                onClick={() => handleOpenCreateMode('lesson')}
              >
                Добавить урок
              </Button>
              <Button
                variant="text"
                size="small"
                onClick={() => handleOpenCreateMode('collection')}
              >
                Добавить коллекцию
              </Button>
            </Stack>

            <Stack spacing={2}>
              <SortableList
                items={materials}
                onOrderChange={handleMaterialsOrdersChange}
                renderItem={(material: MaterialWithContentTypeDto) => (
                  <Stack
                    sx={{
                      p: 1,
                      border: '1px dashed grey',
                      borderRadius: 1,
                    }}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography component="div">
                      {`(${material.contentType === 'lesson' ? 'У' : 'К'}) ${
                        material.title
                      }`}
                    </Typography>

                    <Stack direction="row">
                      <IconButton
                        color="secondary"
                        size="small"
                        onClick={() => handleMaterialClick(material)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleOpenDeleteMode(material.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                )}
              />
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
};
