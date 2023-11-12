import React, { useState } from "react";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Stack from "@mui/material/Stack";
import uploadfile from "../firebase/config";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";

export default function AdjuntarImg({ handleChange, handleUploadImg }) {
  const [imagen, setImagen] = useState();
  const [error, setError] = useState(false);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      handleUploadImg(true);
      const reader = new FileReader();
      reader.onload = async e => {
        const imageData = e.target.result;
        setImagen(imageData);
        try {
          const imgUrl = await uploadfile(file);
          handleChange(imgUrl);
          handleUploadImg(false);
        } catch (error) {
          setError(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Stack direction="row">
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="outlined"
            component="span"
            startIcon={<AttachFileIcon />}
          >
            Agregar Imagen
          </Button>
        </label>
      </Stack>
      {error && (
        <Typography>
          Hubo un error al Cargar la imagen, intente nuevamente
        </Typography>
      )}
      {imagen && (
        <>
          <CheckCircleIcon
            fontSize="large"
            style={{ color: "#24B654" }}
          ></CheckCircleIcon>
        </>
      )}
    </>
  );
}
