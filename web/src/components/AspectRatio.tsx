import React from "react";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import styled from "styled-components";

export const getAspectRatioString = (width: number, height: number) =>
  `${width}:${height}`;

interface StyleProps {
  paddingTop: CSSProperties["paddingTop"];
}

const Root = styled.div<StyleProps>`
  overflow: hidden;
  position: relative;
  height: ${({ paddingTop }) => (paddingTop ? "0px" : undefined)};
  padding-top: ${({ paddingTop }) => paddingTop};
  & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

type AspectRatioProps = React.PropsWithChildren<{
  aspectRatio: string;
}>;

const AspectRatio: React.RefForwardingComponent<
  HTMLDivElement,
  AspectRatioProps
> = ({ aspectRatio, children }, ref) => {
  const [ratioX, ratioY] = aspectRatio.split(":").map(ratio => parseInt(ratio));
  const ratio = (100 * ratioY) / ratioX;
  const paddingTop = isNaN(ratio) ? undefined : `${ratio}%`;

  return (
    <Root ref={ref} paddingTop={paddingTop}>
      {children}
    </Root>
  );
};

export default React.forwardRef(AspectRatio);
