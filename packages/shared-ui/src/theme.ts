import { createTheme } from '@mui/material/styles';
import { COLORS } from './constants';

export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY.RED,
    },
    // secondary: s,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});
