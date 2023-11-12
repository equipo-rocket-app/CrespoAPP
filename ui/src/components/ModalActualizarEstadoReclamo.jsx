/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { patchReclamo } from "../services/reclamosServices";
import ErrorMessage from "./ErrorMessage";
import InformativeModal from "./InformativeModal.";
import AdjuntarImgReparacionReclamo from "./ImagenReparacionReclamo";
import Spinner from "./Spinner";

const textareaStyles = {
  width: "100%",
  fontFamily: "IBM Plex Sans, sans-serif",
  fontSize: "1rem",
  fontWeight: 400,
  lineHeight: "1.5rem",
  padding: "12px",
  borderRadius: "12px 12px 0 12px",
  color: "#000",
  background: "#fff",
  border: "1px solid #ccc",
  boxShadow: "0px 2px 2px #f0f0f0",
  transition: "border-color 0.3s, box-shadow 0.3s",
};

const hoverStyles = {
  borderColor: "#007bff",
};

const focusStyles = {
  borderColor: "#007bff",
  boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.2)",
};

export default function ModalActualizarEstadoReparacion({
  handleOpen,
  isOpen,
  reclamoId,
}) {
  const [imagenReparacion, setImagenReparacion] = useState();
  const [uploadingImg, setUploadingImg] = useState(false);
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    handleOpen(false);
  };

  const handleSubmit = async () => {
    const data = {
      imagen_reparacion: imagenReparacion,
      comentario_reparacion: comment,
    };
    try {
      const response = await patchReclamo({
        reclamoId,
        data,
        isEmployee: true,
      });
      response.status === 200 && setSuccess(true);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {success ? (
          <InformativeModal
            title={"Éxito"}
            message={"Información enviada con éxito"}
          />
        ) : (
          <>
            <DialogTitle id="modal-title">
              Actualice el estado de la obra
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="modal-description">
                Comentario
              </DialogContentText>
              <TextareaAutosize
                placeholder="Deje su comentario sobre la reparación"
                value={comment}
                maxLength={300}
                onChange={event => setComment(event.target.value)}
                style={{
                  ...textareaStyles,
                  "&:hover": hoverStyles,
                  "&:focus": focusStyles,
                }}
              />
              <Typography component="legend">Imagen</Typography>
              <AdjuntarImgReparacionReclamo
                handleChange={setImagenReparacion}
                handleUploadImg={setUploadingImg}
              ></AdjuntarImgReparacionReclamo>
            </DialogContent>
            <DialogActions>
              {isError ? (
                <ErrorMessage
                  message={
                    "Hubo un error al enviar la informacion, intente nuevamente mas tarde "
                  }
                />
              ) : uploadingImg ? (
                <Spinner></Spinner>
              ) : (
                <Button onClick={() => handleSubmit()} color="primary">
                  Enviar Datos
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
