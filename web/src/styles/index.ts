import { css, CSSProperties } from "styled-components";

export const truncate = () => css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
`;

type BackgroundColor = CSSProperties["backgroundColor"];

export const gradientBackground = (
  start: BackgroundColor,
  end: BackgroundColor,
) => css`
  background: linear-gradient(20deg, ${start}, ${end});
`;
