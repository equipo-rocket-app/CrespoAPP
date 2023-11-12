/* eslint-disable multiline-ternary */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import ImagenesList from "../../components/ImagenesList";
import StarRating from "../../components/StarRating";
import ComentarioCard from "../../components/ComentarioCard";
import { getReclamoById } from "../../services/reclamosServices";
import MyLoader from "../../components/MyLoader";
import ModalCalificarReparacion from "../../components/ModalCalificarReparacion";
import ModalActualizarEstadoReparacion from "../../components/ModalActualizarEstadoReclamo";
import InformativeModal from "../../components/InformativeModal.";
import { Container } from "@mui/material";

export default function ReclamoDetalle() {
  let estadoLabel = "";
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const [openModal, setOpenModal] = useState(false);
  const [modificarReclamoModal, setModificarReclamoModal] = useState(false);

  const { reclamoId } = useParams();
  const {
    data: userReclamo,
    error: erroruserReclamo,
    isLoading: isLoadinguserReclamo,
  } = useQuery(["userReclamo", reclamoId], () => getReclamoById(reclamoId));

  function handleOpenModal() {
    setOpenModal(true);
  }

  if (userReclamo) {
    switch (userReclamo.estado) {
      case 1:
        estadoLabel = "Abierto";
        break;
      case 2:
        estadoLabel = "En Proceso";
        break;
      case 3:
        estadoLabel = "Cerrado";
        break;
    }
  }

  return (
    <React.Fragment>
      {erroruserReclamo && (
        <InformativeModal
          title={"Error"}
          message={
            "Hubo un error al cargar la lista de Reclamos, sera redirigido al Inicio"
          }
        ></InformativeModal>
      )}
      {isLoadinguserReclamo && <MyLoader></MyLoader>}
      {userReclamo && (
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={2} sx={{ padding: "2rem 2rem" }}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              style={{ fontWeight: "bold" }}
            >
              Resúmen
            </Typography>
            <Grid item container direction="column" xs={12}>
              <Typography variant="h6" gutterBottom>
                Detalle
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography gutterBottom fontWeight="bold" display={"inline"}>
                    {"Reclamo ID: "}
                  </Typography>
                  <Typography gutterBottom display={"inline"}>
                    {userReclamo.id}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom fontWeight="bold" display={"inline"}>
                    {"Tipo: "}
                  </Typography>
                  <Typography gutterBottom display={"inline"}>
                    {userReclamo.tipo}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom fontWeight="bold" display={"inline"}>
                    {"Descripción: "}
                  </Typography>
                  <Typography gutterBottom display={"inline"}>
                    {userReclamo.descripcion}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom fontWeight="bold" display={"inline"}>
                    {"Nivel de Urgencia: "}
                  </Typography>
                  <Typography gutterBottom display={"inline"}>
                    {userReclamo.urgencia}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom fontWeight="bold" display={"inline"}>
                    {"Estado Actual: "}
                  </Typography>
                  <Typography gutterBottom display={"inline"}>
                    {estadoLabel}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column" xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Ubicación
              </Typography>
              <Grid container>
                <Grid item xs={12}>
                  <Typography gutterBottom fontWeight="bold" display={"inline"}>
                    {"Dirección: "}
                  </Typography>
                  <Typography gutterBottom display={"inline"}>
                    {userReclamo.calle}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom fontWeight="bold" display={"inline"}>
                    {"Altura: "}
                  </Typography>
                  <Typography gutterBottom display={"inline"}>
                    {userReclamo.dir_nro}
                  </Typography>
                  <Grid item xs={12}>
                    <Typography
                      gutterBottom
                      fontWeight="bold"
                      display={"inline"}
                    >
                      {"Esquina: "}
                    </Typography>
                    <Typography gutterBottom display={"inline"}>
                      {userReclamo.esquina ? userReclamo.esquina : "-"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h8"
                    gutterBottom
                    sx={{ mt: 2 }}
                    fontWeight="bold"
                  >
                    {"Entre Calles: "}
                  </Typography>
                  <Typography gutterBottom display={"inline"}>
                    {!userReclamo.entre_calle_1 &&
                      !userReclamo.entre_calle_2 &&
                      "-"}
                    {userReclamo.entre_calle_1}{" "}
                    {userReclamo.entre_calle_1
                      ? `y ${userReclamo.entre_calle_2}`
                      : userReclamo.entre_calle_2}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h8"
                    gutterBottom
                    sx={{ mt: 2 }}
                    fontWeight="bold"
                  >
                    {"Ubicación GPS: "}
                  </Typography>
                  <Typography gutterBottom display={"inline"}>
                    <a
                      href={`https://www.google.com/maps?q=${userReclamo.latitud},${userReclamo.longitud}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      Ver Ubicacion en Maps
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column" xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Imágen Reclamo
              </Typography>
              <Grid container>
                <ImagenesList img={userReclamo.imagen_reclamo} />
              </Grid>
              {userReclamo.imagen_reparacion && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Reparación
                  </Typography>
                  <Grid container>
                    <ImagenesList img={userReclamo.imagen_reparacion} />
                  </Grid>
                </>
              )}
            </Grid>
            {!userData.userArea && (
              <Grid
                item
                container
                direction="column"
                xs={12}
                sx={{ borderTop: "2px solid" }}
              >
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Calificacion del Usuario
                </Typography>
                {userReclamo.fecha_finalizado ? (
                  userReclamo.calificacion !== 0 ? (
                    <Grid container>
                      <StarRating
                        userComment={userReclamo.comentario_calificacion}
                        starValues={userReclamo.calificacion}
                      ></StarRating>
                    </Grid>
                  ) : (
                    <Button
                      style={{
                        width: "50%",
                        margin: "0 1rem",
                        maxWidth: "30rem",
                      }}
                      variant="contained"
                      color="success"
                      sx={{ fontSize: "0.8rem" }}
                      onClick={() => handleOpenModal()}
                    >
                      Calificar Reparación
                    </Button>
                  )
                ) : (
                  "La Obra aún no ha sido finalidaza, podra calificar y ver fotos/detalles de la reparación una vez se haya terminado."
                )}
              </Grid>
            )}
            <Grid item container direction="column" xs={12}>
              {userReclamo.comentario_reparacion && (
                <Grid item container direction="column" xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Comentario Reparación
                  </Typography>
                  <Grid container>
                    <ComentarioCard
                      comentario={userReclamo.comentario_reparacion}
                    ></ComentarioCard>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item container direction="column" xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Historial
              </Typography>
              <Box
                sx={{
                  display: "block",
                  m: "0.2rem",
                }}
              >
                <Button sx={{ border: "solid 1.5px", fontSize: "0.8rem" }}>
                  {userReclamo.fecha_creacion}
                </Button>
                <KeyboardDoubleArrowRightIcon
                  fontSize="large"
                  sx={{ verticalAlign: "middle" }}
                ></KeyboardDoubleArrowRightIcon>
                <Button variant="contained" sx={{ fontSize: "0.8rem" }}>
                  Reclamo Creado
                </Button>
              </Box>
              {userReclamo.fecha_proceso && (
                <Box
                  sx={{
                    display: "block",
                    m: "0.2rem",
                  }}
                >
                  <Button sx={{ border: "solid 1.5px", fontSize: "0.8rem" }}>
                    {userReclamo.fecha_proceso}
                  </Button>
                  <KeyboardDoubleArrowRightIcon
                    fontSize="large"
                    sx={{ verticalAlign: "middle" }}
                  ></KeyboardDoubleArrowRightIcon>
                  <Button variant="contained" sx={{ fontSize: "0.8rem" }}>
                    En Proceso
                  </Button>
                </Box>
              )}
              {userReclamo.fecha_finalizado && (
                <Box
                  sx={{
                    display: "block",
                    m: "0.2rem",
                  }}
                >
                  <Button sx={{ border: "solid 1.5px", fontSize: "0.8rem" }}>
                    {userReclamo.fecha_finalizado}
                  </Button>
                  <KeyboardDoubleArrowRightIcon
                    fontSize="large"
                    sx={{ verticalAlign: "middle" }}
                  ></KeyboardDoubleArrowRightIcon>
                  <Button variant="contained" sx={{ fontSize: "0.8rem" }}>
                    Reclamo Finalizado
                  </Button>
                </Box>
              )}
            </Grid>
            {userData.userArea && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    border: "solid 1.5px",
                    fontSize: "0.8rem",
                    margin: "3rem 0 1rem 0",
                  }}
                  onClick={() => setModificarReclamoModal(true)}
                >
                  Actualizar Estado
                </Button>
              </div>
            )}
          </Grid>
        </Container>
      )}
      {openModal && (
        <ModalCalificarReparacion
          handleOpen={setOpenModal}
          isOpen={openModal}
          reclamoId={userReclamo.id}
        />
      )}
      {modificarReclamoModal && (
        <ModalActualizarEstadoReparacion
          handleOpen={setModificarReclamoModal}
          isOpen={modificarReclamoModal}
          reclamoId={userReclamo.id}
        ></ModalActualizarEstadoReparacion>
      )}
    </React.Fragment>
  );
}
