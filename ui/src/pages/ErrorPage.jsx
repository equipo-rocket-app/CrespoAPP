import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function ErrorPage() {
  const handleClic = () => {
    window.location.href = "http://localhost:3000/";
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#BB0649",
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        400
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        Ha ocurrido un error en la operación.
      </Typography>
      <Button
        variant="contained"
        onClick={() => handleClic()}
        style={{ margin: "2rem" }}
      >
        Volver al Inicio
      </Button>
    </Box>
  );
}
