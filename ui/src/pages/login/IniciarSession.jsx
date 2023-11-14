/* eslint-disable no-unused-vars */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { logIn } from "../../services/userServices";
import ErrorMessage from "../../components/ErrorMessage";

export default function IniciarSession() {
  const [loginError, setLoginError] = React.useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const response = await logIn(email, password);
      const userData = {
        userId: response.data.id,
        userEmail: response.data.username,
        userToken: response.data.token,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        userName: `${response.data.first_name} ${response.data.last_name}`,
        userArea: response.data.user_area,
      };
      sessionStorage.setItem("userData", JSON.stringify(userData));
      if (userData.userArea) {
        window.location.href = "http://localhost:3000/reclamos-lista";
      } else {
        window.location.href = "http://localhost:3000/";
      }
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100%" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://firebasestorage.googleapis.com/v0/b/creapoappv2.appspot.com/o/bg-Nuestra-Ciudad%20(1).png?alt=media&token=e3889063-8e37-4a24-aced-eb5f346d4c27)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicia Sesión
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {loginError && (
              <ErrorMessage message={"Usuario o contraseña incorrectos"} />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/recuperar-pass" variant="body2">
                  Olvidaste la Contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/registro" variant="body2">
                  Registrate
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
