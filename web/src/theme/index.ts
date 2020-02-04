import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { red, green, grey } from "@material-ui/core/colors";

export const Colors = {
  primary: "#165982",
  secondary: "#2dde98",
  red: red[400],
  green: green[600],
  grey: grey[400],
};

let theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
