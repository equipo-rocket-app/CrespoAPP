/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ImagenesList from "../../../components/ImagenesList";

import { useReclamoForm } from "../../../context/formReclamoContext";

export default function Review() {
  const { formFields } = useReclamoForm();
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Resúmen
      </Typography>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Detalle
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography gutterBottom fontWeight="bold" display={"inline"}>
                {"Tipo: "}
              </Typography>
              {formFields.tipoReclamo.value ? (
                <Typography gutterBottom display={"inline"}>
                  {formFields.tipoReclamo.value}
                </Typography>
              ) : (
                <Typography color="#ff0000" gutterBottom display={"inline"}>
                  *Campo Obligatorio
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom fontWeight="bold" display={"inline"}>
                {"Descripción: "}
              </Typography>
              {formFields.descripcionReclamo ? (
                <Typography gutterBottom display={"inline"}>
                  {formFields.descripcionReclamo}
                </Typography>
              ) : (
                <Typography color="#ff0000" gutterBottom display={"inline"}>
                  *Campo Obligatorio
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom fontWeight="bold" display={"inline"}>
                {"Nivel de Urgencia: "}
              </Typography>
              {formFields.urgenciaReclamo.value ? (
                <Typography gutterBottom display={"inline"}>
                  {formFields.urgenciaReclamo.value}
                </Typography>
              ) : (
                <Typography color="#ff0000" gutterBottom display={"inline"}>
                  *Campo Obligatorio
                </Typography>
              )}
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
              {formFields.ubicacionCalleReclamo.value ? (
                <Typography gutterBottom display={"inline"}>
                  {formFields.ubicacionCalleReclamo.value}
                </Typography>
              ) : (
                <Typography color="#ff0000" gutterBottom display={"inline"}>
                  *Campo Obligatorio
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom fontWeight="bold" display={"inline"}>
                {"Altura: "}
              </Typography>
              {formFields.ubicacionAlturaCalleReclamo ? (
                <Typography gutterBottom display={"inline"}>
                  {formFields.ubicacionAlturaCalleReclamo}
                </Typography>
              ) : (
                <Typography color="#ff0000" gutterBottom display={"inline"}>
                  *Campo Obligatorio
                </Typography>
              )}
              <Grid item xs={12}>
                <Typography gutterBottom fontWeight="bold" display={"inline"}>
                  {"Barrio: "}
                </Typography>
                <Typography gutterBottom display={"inline"}>
                  {formFields.ubicacionBarrio.value || "-"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom fontWeight="bold" display={"inline"}>
                  {"Esquina: "}
                </Typography>
                <Typography gutterBottom display={"inline"}>
                  {formFields.ubicacionInterseccion.value || "-"}
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
                {formFields.ubicacionEntreCalle1.value} {" - "}
                {formFields.ubicacionEntreCalle2.value}
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
              {formFields.ubicacionGPSReclamo.latitude ? (
                <Typography gutterBottom display={"inline"}>
                  {formFields.ubicacionGPSReclamo.latitude && (
                    <a
                      href={`https://www.google.com/maps?q=${formFields.ubicacionGPSReclamo.latitude},${formFields.ubicacionGPSReclamo.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      Locacion GPS{" "}
                    </a>
                  )}
                </Typography>
              ) : (
                <Typography color="#ff0000" gutterBottom display={"inline"}>
                  *Campo Obligatorio
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Imágen
          </Typography>
          <Grid container spacing={3} sx={{ margin: "0 auto" }}>
            {formFields.imagenReclamoToShow ? (
              <ImagenesList
                img={[formFields.imagenReclamoToShow]}
              ></ImagenesList>
            ) : (
              <Typography sx={{ mt: 2 }} style={{ fontSize: "1rem" }}>
                No se cargo ninguna Imágen
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
