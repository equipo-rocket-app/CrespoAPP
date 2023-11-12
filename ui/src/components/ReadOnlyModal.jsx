import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "90vw",
  maxHeight: "70vh",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

export default function ReadOnlyModal({ titulo, texto, open, handleClose }) {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {titulo}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {texto}
          </Typography>
          <Button
            sx={{
              marginTop: "1.5rem",
              marginX: "auto",
              backgroundColor: "lightblue",
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleClose}
          >
            Acepto
          </Button>
        </Box>
      </Modal>
    </>
  );
}
