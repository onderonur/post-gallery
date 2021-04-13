import styled from '@emotion/styled';
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

export const Bold = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

export const BreakWord = styled.span`
  white-space: pre-wrap;
  word-break: break-word;
`;
