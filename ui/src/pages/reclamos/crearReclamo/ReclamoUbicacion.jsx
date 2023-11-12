/* eslint-disable indent */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useQuery } from "react-query";

import BasicSelect from "../../../components/BasicSelect";

import { useReclamoForm } from "../../../context/formReclamoContext";
import { getBarrios, getCalles } from "../../../services/ubicaciones";
import getCurrentPosition from "../../../utils/getGpsLocation";
import Spinner from "../../../components/Spinner";

export default function ReclamoUbicacion() {
  const { formFields, updateFormFields } = useReclamoForm();
  const [alturaCalle, setAlturaCalle] = useState("");
  const [gpsLocationError, setGpsLocationError] = useState(false);

  const {
    data: callesList,
    error: errorcallesList,
    isLoading: isLoadingCallesList,
  } = useQuery(["callesList"], () => getCalles());

  const {
    data: barriosList,
    error: errorbarriosList,
    isLoading: isLoadingBarriosList,
  } = useQuery(["barriosList"], () => getBarrios());

  function handleAlturaCalle(event) {
    const alturaInput = event.target.value;
    if (/^\d{0,5}$/.test(alturaInput)) {
      setAlturaCalle(alturaInput);
      updateFormFields("ubicacionAlturaCalleReclamo", alturaCalle);
    }
  }

  function handleLocation() {
    getCurrentPosition()
      .then(location => {
        updateFormFields("ubicacionGPSReclamo", location);
      })
      .catch(() => {
        setGpsLocationError(true);
      });
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ubicación
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {isLoadingCallesList && <Spinner />}
          {callesList && (
            <BasicSelect
              itemsValues={callesList}
              label="Calle"
              inputKey="ubicacionCalleReclamo"
              handleChange={updateFormFields}
            ></BasicSelect>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="calleNro"
            label="Número"
            helperText="Altura Calle"
            fullWidth
            variant="standard"
            value={alturaCalle || formFields.ubicacionAlturaCalleReclamo}
            onChange={handleAlturaCalle}
            inputProps={{
              maxLength: 5,
              inputMode: "numeric",
            }}
          />
        </Grid>
      </Grid>
      <Typography variant="h7" gutterBottom>
        Barrio
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ marginBottom: "1rem", paddingTop: "0.5rem" }}
      >
        <Grid item xs={12}>
          {isLoadingBarriosList && <Spinner />}
          {barriosList && (
            <BasicSelect
              itemsValues={barriosList}
              label="Barrio/Loteo"
              inputKey="ubicacionBarrio"
              handleChange={updateFormFields}
            ></BasicSelect>
          )}
        </Grid>
      </Grid>
      <Typography variant="h7" gutterBottom>
        Intersección
      </Typography>
      {callesList && (
        <>
          <Grid
            container
            spacing={3}
            sx={{ marginBottom: "1rem", paddingTop: "0.5rem" }}
          >
            <Grid item xs={12}>
              <BasicSelect
                itemsValues={callesList}
                label="Calle"
                inputKey="ubicacionInterseccion"
                handleChange={updateFormFields}
              ></BasicSelect>
            </Grid>
          </Grid>
          <Typography variant="h8" gutterBottom>
            Entre Calles
          </Typography>
          <Grid
            container
            spacing={3}
            sx={{ marginBottom: "1rem", paddingTop: "0.5em" }}
          >
            <Grid item xs={12} sm={6}>
              <BasicSelect
                itemsValues={callesList}
                label="Calle 1"
                inputKey="ubicacionEntreCalle1"
                handleChange={updateFormFields}
              ></BasicSelect>
            </Grid>
            <Grid item xs={12} sm={6}>
              <BasicSelect
                itemsValues={callesList}
                label="Calle 2"
                inputKey="ubicacionEntreCalle2"
                handleChange={updateFormFields}
              ></BasicSelect>
            </Grid>
          </Grid>
        </>
      )}
      <Typography variant="h8" gutterBottom>
        Ubicación GPS
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ marginBottom: "1rem", paddingTop: "0.5em" }}
      >
        <Grid item xs={12}>
          {gpsLocationError && (
            <Typography color={"#b71c1c"}>
              No se puedo obtener la Ubicación y es REQUERIDO para poder enviar
              un reclamo. Revise la configuracion de su dispositivo e intente
              nuevamente...
            </Typography>
          )}
          {!formFields.ubicacionGPSReclamo.latitude &&
          !formFields.ubicacionGPSReclamo.longitude ? (
            <Button
              variant="contained"
              endIcon={<LocationOnIcon />}
              onClick={() => handleLocation()}
            >
              Adjuntar Ubicación
            </Button>
          ) : (
            <CheckCircleIcon
              fontSize="large"
              style={{ color: "#24B654" }}
            ></CheckCircleIcon>
          )}
        </Grid>
      </Grid>
      {(errorcallesList || errorbarriosList) && (
        <Typography color={"#b71c1c"}>
          Error al obtener información, recargue la página e intente
          nuevamente...
        </Typography>
      )}
    </React.Fragment>
  );
}
