import { CSSProperties } from '@material-ui/core/styles/withStyles';

type BackgroundColor = CSSProperties['backgroundColor'];

export const gradientBackground = (
  start: BackgroundColor,
  end: BackgroundColor,
) => {
  return {
    background: `linear-gradient(20deg, ${start}, ${end})`,
  };
};
