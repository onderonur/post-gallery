import React from "react";
import { CircularProgress, Box } from "@material-ui/core";
import FlexRow from "./FlexRow";

const Loading = () => {
  return (
    <FlexRow justifyContent="center">
      <Box padding={1}>
        <CircularProgress />
      </Box>
    </FlexRow>
  );
};

export default Loading;
