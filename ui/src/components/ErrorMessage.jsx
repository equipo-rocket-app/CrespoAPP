import React from "react";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";

export default function ErrorMessage({ message }) {
  return (
    <Typography
      variant="body2"
      color="error"
      display="flex"
      alignItems="center"
    >
      <ErrorIcon></ErrorIcon> {message}
    </Typography>
  );
}
