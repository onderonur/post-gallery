import styled from "styled-components";
import { Typography } from "@material-ui/core";

const BoldTypography = styled(Typography)`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
` as typeof Typography;

export default BoldTypography;
