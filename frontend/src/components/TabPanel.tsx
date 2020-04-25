import React from "react";
import { Box, Typography, TabsProps } from "@material-ui/core";

type TabValue = TabsProps["value"];

interface TabPanelProps {
  children: React.ReactNode;
  currentValue: TabValue;
  value: TabValue;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  currentValue,
}) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== currentValue}
      // TODO:
      // id={`scrollable-auto-tabpanel-${index}`}
      // aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      {value === currentValue && <Box padding={2}>{children}</Box>}
    </Typography>
  );
};

export default TabPanel;
