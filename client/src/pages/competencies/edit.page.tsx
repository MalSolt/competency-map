import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { CompetencyId } from '@kernel';
import { CompetencyEditMain } from 'widgets/newedit-competency';
import { CompetencyRootMaterials } from 'widgets/materials';
import { useQueryTabState } from 'shared/lib/hooks/useQueryTabState';
import { useParamId } from 'shared/lib/hooks/useParamId';

type Props = {};

const TABS = {
  MAIN: 'main',
  MATERIALS: 'materials',
  QUESTIONS: 'questions,',
};

const TABS_ARRAY = Object.values(TABS);

export const EditCompetencyPage: FC<Props> = () => {
  const competencyId = useParamId<CompetencyId>('id');
  const { tabValue, setTabValue } = useQueryTabState(TABS_ARRAY, {
    id: String(competencyId),
  });

  const handleChangeTab = (_: any, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab}>
            <Tab label="Осовная информация" value={TABS.MAIN} />
            <Tab label="Уроки" value={TABS.MATERIALS} />
            <Tab label="Вопросы" value={TABS.QUESTIONS} />
          </TabList>
        </Box>
        <TabPanel value={TABS.MAIN}>
          <CompetencyEditMain competencyId={competencyId} />
        </TabPanel>
        <TabPanel value={TABS.MATERIALS}>
          <CompetencyRootMaterials competencyId={competencyId} />
        </TabPanel>
        <TabPanel value={TABS.QUESTIONS}>questions</TabPanel>
      </TabContext>
    </Box>
  );
};
