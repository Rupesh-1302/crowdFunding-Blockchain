import React from "react";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";

function PageWrapper({ children }) {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        flexGrow: 1,
        px: 3,
        py: 1,
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
}

export default PageWrapper;
