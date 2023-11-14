/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";

import ReclamoCardItem from "../../components/ReclamoCardItem";
import { getReclamosByIdUser } from "../../services/reclamosServices";
import MyLoader from "../../components/MyLoader";

export default function ReclamosList() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const {
    data: userReclamosList,
    error: errorUserReclamosList,
    isLoading: isLoadingUserReclamosList,
    isFetching: isFetchingUserReclamosList,
  } = useQuery(["userReclamosList"], () =>
    getReclamosByIdUser(userData.userId)
  );

  const reclamosPerPage = 3;
  const totalPages = Math.ceil(
    userReclamosList && userReclamosList.length / reclamosPerPage
  );

  const [page, setPage] = useState(1);
  const handleChangePage = (event, newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(newPage);
  };

  const startIndex = (page - 1) * reclamosPerPage;
  const endIndex = startIndex + reclamosPerPage;

  return (
    <>
      <Typography
        align="center"
        variant="h4"
        color="inherit"
        noWrap
        style={{
          margin: "6rem 0 0 0",
          fontWeight: "bold",
        }}
      >
        Lista de Reclamos
      </Typography>
      <main>
        {userReclamosList?.length > 0 &&
        (!isLoadingUserReclamosList || !isFetchingUserReclamosList) ? (
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={2}>
              {userReclamosList.slice(startIndex, endIndex).map(reclamo => (
                <Grid
                  item
                  key={reclamo.id}
                  xs={10}
                  sm={6}
                  md={4}
                  style={{ margin: "0 auto" }}
                >
                  <Link to={`/reclamo-detalle/${reclamo.id}`} key={reclamo.id}>
                    <ReclamoCardItem
                      area={reclamo.area}
                      calificacion={reclamo.calificacion}
                      descripcion={reclamo.descripcion}
                      estado={reclamo.estado}
                      fecha={reclamo.fecha_creacion}
                      idReclamo={reclamo.id}
                      img={reclamo.imagen_reclamo}
                      tipo={reclamo.tipo}
                      key={reclamo.id}
                    ></ReclamoCardItem>
                  </Link>
                </Grid>
              ))}
            </Grid>
            <Pagination
              sx={{ margin: "1rem", float: "right" }}
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Container>
        ) : (
          <div
            style={{ display: "flex", alignItems: "center", margin: "3rem" }}
          >
            <Typography
              variant="h6"
              color="inherit"
              style={{ margin: "0 auto" }}
            >
              No se encontraron Reclamos para Mostrar
            </Typography>
          </div>
        )}
        {isLoadingUserReclamosList && <MyLoader></MyLoader>}
        {errorUserReclamosList && (
          <Typography style={{ margin: "0 auto" }}>
            Ocurrio un error al obtener RECLAMOS. Recargue e intente nuevamente{" "}
          </Typography>
        )}
      </main>
    </>
  );
}
