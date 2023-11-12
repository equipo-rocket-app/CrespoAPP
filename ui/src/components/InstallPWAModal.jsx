import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function PwaModal({ installApp }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    installApp();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "10" }}
      >
        <DialogTitle id="modal-title">Instalar +Crespo APP</DialogTitle>
        <DialogContent>
          <DialogContentText id="modal-description">
            <p>
              Esta aplicacion es una{" "}
              <strong>Progressive Web APP y requiere ser instalada.</strong>
            </p>
            <p>Pulse el Boton para instalarla y tener una mejor experiencia.</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Instalar APP
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
