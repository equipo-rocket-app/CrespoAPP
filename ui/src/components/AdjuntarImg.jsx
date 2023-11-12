import React from "react";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Stack from "@mui/material/Stack";
import uploadfile from "../firebase/config";

export default function AdjuntarImg({ inputKey, handleChange }) {
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async e => {
        const imageData = e.target.result;
        handleChange("imagenReclamoToShow", imageData);
        try {
          const imgUrl = await uploadfile(file);
          handleChange(inputKey, imgUrl);
        } catch (error) {
          handleChange("imagenReclamoToShow", null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
  );
}
