// Using styled-components with TypeScript:
// https://styled-components.com/docs/api#typescript
// import original module declarations
import "styled-components";
import { Theme } from "@material-ui/core";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
