import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function MyLoader() {
  return (
    <Box
      data-testid="loaderTest"
      sx={{
        height: "80%",
        width: "80%",
        margin: "25% auto",
      }}
    >
      <LinearProgress />
    </Box>
  );
}
