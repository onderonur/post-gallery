import styled, { CSSProperties } from "styled-components";

interface FlexRowProps {
  justifyContent: CSSProperties["justifyContent"];
}

const FlexRow = styled.div<FlexRowProps>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
`;

export default FlexRow;
