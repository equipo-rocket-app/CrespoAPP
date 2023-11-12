/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { crearUsuario } from "../../services/userServices";
import InformativeModal from "../../components/InformativeModal.";

export default function SignUp() {
  const [isCreated, setIsCreated] = useState(false);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await crearUsuario(
        data.get("first_name"),
        data.get("last_name"),
        data.get("email"),
        data.get("password"),
        data.get("direccion_calle"),
        data.get("direccion_nro"),
        data.get("celular")
      );
      if (response.status === 201) {
        setUserName(`${response.data.first_name}, ${response.data.last_name}`);
        setIsCreated(true);
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ paddingBottom: "3rem" }}>
      <CssBaseline />
      <Box
        sx={{
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro de Usuario
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="first_name"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                autoFocus
                error={error?.first_name}
                helperText={error?.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="apellido"
                label="Apellido"
                name="last_name"
                error={error?.last_name}
                helperText={error?.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="celular"
                label="Número de Celular"
                name="celular"
                error={error?.celular}
                helperText={error?.celular}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="direccion_calle"
                required
                fullWidth
                id="direccionCalle"
                label="Dirección Calle"
                error={error?.direccion_calle}
                helperText={error?.direccion_calle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="direccionNumero"
                label="Dirección Número"
                name="direccion_nro"
                error={error?.direccion_nro}
                helperText={error?.direccion_nro}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                error={error?.email}
                helperText={error?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                error={error?.password}
                helperText={error?.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear Cuenta
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Ya tenes Cuenta? Inicia Sesión
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {isCreated && (
        <InformativeModal
          title={"Éxito"}
          message={
            "El usuario se ha creado con Éxito. Ya puede operar en la APP"
          }
        />
      )}
    </Container>
  );
}
