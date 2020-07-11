import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { red, blue } from "@material-ui/core/colors";

export const colors = {
  primary: blue[700],
  secondary: red[700],
};

let theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
