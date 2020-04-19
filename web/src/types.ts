// Using styled-components with TypeScript:
// https://styled-components.com/docs/api#typescript
// import original module declarations
import "styled-components";
import { Theme } from "@material-ui/core";
import { Scalars } from "generated/graphql";
import { DataProxy } from "apollo-cache";

export type ID = Scalars["ID"];
export type Cursor = Scalars["Cursor"];

export type CacheProxy = DataProxy;

// Get element type from array
export type ArrayElement<
  ArrayType extends readonly unknown[]
> = ArrayType[number];

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
