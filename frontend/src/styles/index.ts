import { CSSProperties } from "@material-ui/core/styles/withStyles";

export const truncate: CSSProperties = {
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  minWidth: 0,
};

type BackgroundColor = CSSProperties["backgroundColor"];

export const gradientBackground = (
  start: BackgroundColor,
  end: BackgroundColor,
) => {
  return {
    background: `linear-gradient(20deg, ${start}, ${end})`,
  };
};
