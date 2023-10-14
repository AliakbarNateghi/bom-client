import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // center horizontally
        alignItems: "center", // center vertically
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
