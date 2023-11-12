/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DetalleReclamo from "./ReclamoDetalle";
import UbicacionReclamo from "./ReclamoUbicacion";
import ResumenReclamo from "./Resumen";

import { useReclamoForm } from "../../../context/formReclamoContext";
import { postReclamos } from "../../../services/reclamosServices";
import InformativeModal from "../../../components/InformativeModal.";

export default function GenerarReclamo() {
  const [showModalOk, setShowModalOk] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const steps = ["Detalle", "Ubicación", "Resúmen"];

  const { formFields, resetFormFields } = useReclamoForm();

  const [disabledButtonState, setDisabledButtonState] = useState(false);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <DetalleReclamo />;
      case 1:
        return <UbicacionReclamo />;
      case 2:
        return <ResumenReclamo />;
      default:
        throw new Error("Unknown step");
    }
  }

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function handleSendForm() {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const data = {
      tipo: formFields.tipoReclamo.id,
      descripcion: formFields.descripcionReclamo,
      calle: formFields.ubicacionCalleReclamo.id,
      dir_nro: formFields.ubicacionAlturaCalleReclamo,
      inteserccion: formFields.ubicacionInterseccion.id,
      entre_calle_1: formFields.ubicacionEntreCalle1.id,
      entre_calle_2: formFields.ubicacionEntreCalle2.id,
      barrio: formFields.ubicacionBarrio.id,
      latitud: formFields.ubicacionGPSReclamo.latitude,
      longitud: formFields.ubicacionGPSReclamo.longitude,
      urgencia: formFields.urgenciaReclamo.id,
      usuario_creo: user.userId,
      imagen_reclamo: formFields.imagenReclamo,
    };

    postReclamos(data)
      .then(() => {
        resetFormFields();
        setShowModalOk(true);
        setActiveStep(0);
      })
      .catch(() => {
        resetFormFields();
        setShowModalError(true);
      });
  }

  useEffect(() => {
    activeStep === 2
      ? setDisabledButtonState(
          !(
            formFields.tipoReclamo &&
            formFields.descripcionReclamo &&
            formFields.urgenciaReclamo &&
            formFields.ubicacionCalleReclamo &&
            formFields.ubicacionAlturaCalleReclamo
          )
        )
      : setDisabledButtonState(false);
  }, [activeStep]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 10 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Generación de Reclamo
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Muchas gracias!
              </Typography>
              <Typography variant="subtitle1">
                Su reclamo será revisado a la brevedad y asignado al Área
                específica para su Atención y/o reparación.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={() => handleBack()} sx={{ mt: 3, ml: 1 }}>
                    Atrás
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <Button
                    disabled={disabledButtonState}
                    variant="contained"
                    onClick={() => handleSendForm()}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Enviar Reclamo
                  </Button>
                ) : (
                  <Button
                    disabled={disabledButtonState}
                    variant="contained"
                    onClick={() => handleNext()}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Siguiente
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
      {showModalOk && (
        <InformativeModal
          title={"Exito"}
          message={
            "El Reclamo se Envío con Exito. Puede ver los avances y estados en la sección de Reclamos"
          }
        />
      )}
      {showModalError && (
        <InformativeModal
          title={"Error"}
          message={
            "Hubo un Error al enviar su reclamo, intente nuevamente mas tarde"
          }
        />
      )}
    </React.Fragment>
  );
}
