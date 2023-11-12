import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function StatusButton({ status }) {
  return (
    <Box
      data-testid={`statusButtonText-${status}`}
      width="60%"
      m="0 auto"
      p="5px"
      display="flex"
      justifyContent="center"
      backgroundColor={status === 1 ? "#4AC03C" : "#EC501A"}
      borderRadius="4px"
    >
      <Typography color={"#D3C6C1"} sx={{ ml: "5px" }}>
        {status === 1 && "PASSED"} {status === 0 && "FAILED"}
      </Typography>
    </Box>
  );
}
