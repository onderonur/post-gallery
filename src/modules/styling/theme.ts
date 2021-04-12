import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: red[700],
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
