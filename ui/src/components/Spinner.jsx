import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function Spinner() {
  return (
    <Stack
      data-testid="spinnerTest"
      sx={{ color: "#EABE3F", height: "2rem", m: 2 }}
    >
      <CircularProgress color="inherit" />
    </Stack>
  );
}
