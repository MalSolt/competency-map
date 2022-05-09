import { TabContext, TabList, TabPanel } from '@mui/lab';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import { FC, ReactNode, useState } from 'react';

type TabName = 'add' | 'view-settings';
type Props = { actions?: ReactNode; viewSettings?: ReactNode };

export const MapSidebar: FC<Props> = ({ actions, viewSettings }) => {
  const [tabValue, setTabValue] = useState<TabName>('view-settings');
  return (
    <Paper>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="Отображение" value="view-settings" />
            <Tab label="Добавление" value="add" />
          </TabList>
        </Box>
        <TabPanel value="view-settings">{viewSettings}</TabPanel>
        <TabPanel value="add">{actions}</TabPanel>
      </TabContext>
    </Paper>
  );
};
