import { useMediaQuery, Theme } from '@material-ui/core';

const useIsMobile = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  return matches;
};

export default useIsMobile;
