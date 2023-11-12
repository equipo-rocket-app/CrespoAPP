import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Stack";

export default function MyErrorMessage({ errorMessage }) {
  return (
    <Box data-testid="errorMessageTest" sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error Getting Students List</AlertTitle>
        Error Code: {errorMessage.code} - Error Detail: {errorMessage.message}
      </Alert>
    </Box>
  );
}
