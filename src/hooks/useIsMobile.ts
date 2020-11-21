import { useMediaQuery, Theme } from '@material-ui/core';

const useIsMobile = () => {
  // https://material-ui.com/customization/breakpoints/#default-breakpoints
  // https://material-ui.com/customization/breakpoints/#theme-breakpoints-down-key-media-query
  const matches = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  return matches;
};

export default useIsMobile;
