/* eslint-disable no-unused-vars */
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";

import BasicSelect from "../../../components/BasicSelect";
import BasicTextArea from "../../../components/BasicTextArea";
import AdjuntarImg from "../../../components/AdjuntarImg";
import ImagenesList from "../../../components/ImagenesList";

import { useReclamoForm } from "../../../context/formReclamoContext";
import {
  getTiposReclamos,
  getUrgenciasReclamos,
} from "../../../services/reclamosServices";
import Spinner from "../../../components/Spinner";

export default function ReclamoDetalle() {
  const { formFields, updateFormFields } = useReclamoForm();

  const {
    data: reclamosTipoList,
    error: errorTipoReclamo,
    isLoading: isLoadingTipoReclamo,
  } = useQuery(["reclamosTipoList"], () => getTiposReclamos());

  const {
    data: reclamosUrgenciaList,
    error: errorUrgenciaReclamo,
    isLoading: isLoadingUrgenciaReclamo,
  } = useQuery(["reclamosUrgenciaList"], () => getUrgenciasReclamos());

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalles
      </Typography>
      <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6}>
          {isLoadingTipoReclamo && <Spinner />}
          {reclamosTipoList && (
            <BasicSelect
              itemsValues={reclamosTipoList}
              label="Área de Reclamo"
              inputKey="tipoReclamo"
              handleChange={updateFormFields}
            ></BasicSelect>
          )}
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom>
        Descripción
      </Typography>
      <Grid container spacing={3} style={{ marginBottom: "20px" }}>
        <Grid item xs={12}>
          <BasicTextArea
            textToShow={"Ingrese aquí la descripción del Reclamo"}
            inputKey="descripcionReclamo"
            handleChange={updateFormFields}
          ></BasicTextArea>
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom>
        Nivel de Urgencia
      </Typography>
      <Grid container spacing={3} style={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6}>
          {isLoadingUrgenciaReclamo && <Spinner />}
          {reclamosUrgenciaList && (
            <BasicSelect
              itemsValues={reclamosUrgenciaList}
              label="Nivel de Urgencia"
              inputKey="urgenciaReclamo"
              handleChange={updateFormFields}
            ></BasicSelect>
          )}
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom>
        Imágenes
      </Typography>
      <Grid container spacing={3} style={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6}>
          <AdjuntarImg
            inputKey="imagenReclamo"
            handleChange={updateFormFields}
          ></AdjuntarImg>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ margin: "0 auto" }}>
        <ImagenesList img={[formFields.imagenReclamoToShow]}></ImagenesList>
      </Grid>
      {(errorTipoReclamo || errorUrgenciaReclamo) && (
        <Typography color={"#b71c1c"}>
          Error al obtener información, recargue la página e intente
          nuevamente...
        </Typography>
      )}
    </React.Fragment>
  );
}
