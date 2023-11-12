import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function InformativeModal({ title, message }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <DialogTitle id="modal-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="modal-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Volver Al Inicio
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
