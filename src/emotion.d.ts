// https://emotion.sh/docs/typescript#define-a-theme
import '@emotion/react';
import { Theme as MuiTheme } from '@material-ui/core';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}
