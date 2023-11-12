/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import GraficoTorta from "../../components/GraficoTorta";
import CardSlider from "../../components/CardSlider";
import { getReclamosChart } from "../../services/dashboard";
import MyLoader from "../../components/MyLoader";

import logoCrespoCirculo from "../../assets/logoCrespoCirculo.png";

export default function dashboard() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const {
    data: reclamosDashboardData,
    error: errorreclamosDashboardData,
    isLoading: isLoadingreclamosDashboardData,
  } = useQuery(["reclamosDashboardData"], () => getReclamosChart());

  if (userData.userArea) {
    window.location.href = "http://localhost:3000/reclamos-lista";
  } else {
    return (
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <img
                src={logoCrespoCirculo}
                alt="Logo Crespo"
                style={{ height: "6rem" }}
              />
            </div>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              {`Bienvenido/a ${userData.firstName}`}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              paragraph
            >
              Esta es la Nueva APP de la Municipalidad de Crespo para Gestionar
              Reclamos de los Ciudadanos. Aquí podras generar reclamos de una
              forma intuitiva y moderna, asi como ver las actualizaciones y
              resolucion de los mismos desde un solo sitio.
            </Typography>
            <CardSlider></CardSlider>
          </Container>
          <Container
            sx={{ py: 8, display: "flex", justifyContent: "center" }}
            maxWidth="md"
          >
            {errorreclamosDashboardData && (
              <Typography>
                Ocurrio un error al consultar el Dashboard de Reclamos
              </Typography>
            )}
            {isLoadingreclamosDashboardData && <MyLoader></MyLoader>}
            {reclamosDashboardData && (
              <GraficoTorta
                titulo={"Mis Reclamos"}
                data={reclamosDashboardData}
              ></GraficoTorta>
            )}
          </Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              to="/nuevo-reclamo"
              variant="contained"
              sx={{ width: "50%", maxWidth: "30rem" }}
            >
              Generar Reclamo
            </Button>
          </Box>
        </Box>
      </main>
    );
  }
}
