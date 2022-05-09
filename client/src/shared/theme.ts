import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
      light: '#757ce8',
      dark: '#002884',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

// eslint-disable-next-line import/no-default-export
export default theme;
