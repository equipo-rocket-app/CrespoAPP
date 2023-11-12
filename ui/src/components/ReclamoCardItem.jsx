/* eslint-disable multiline-ternary */
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import NoImagen from "../assets/NoImagen.jpg";
import { Button } from "@mui/material";
import StarRating from "./StarRating";

export default function ReclamoCardItem({
  idReclamo,
  img,
  tipo,
  descripcion,
  fecha,
  estado,
  calificacion,
}) {
  let reclamoColor = "warning";
  let estadoLabel = "";

  switch (estado) {
    case 1:
      reclamoColor = "error";
      estadoLabel = "ABIERTO";
      break;
    case 2:
      reclamoColor = "warning";
      estadoLabel = "EN PROCESO";
      break;
    case 3:
      reclamoColor = "success";
      estadoLabel = "CERRADO";
      break;
  }

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: "56.25%",
        }}
        image={img || NoImagen}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ margin: "0.5rem 0" }}
        >
          {fecha}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {tipo}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ margin: "0.5rem 0" }}
        >
          ID_Reclamo: {idReclamo}
        </Typography>
        <Typography>{descripcion.slice(0, 100)}</Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ display: "inline-block" }}>
          <Button
            variant="contained"
            color={reclamoColor}
            style={{ fontSize: "10px" }}
          >
            {estadoLabel}
          </Button>
        </Typography>
        <Typography
          sx={{ display: "inline-block", float: "right", marginRight: "1rem" }}
        >
          {calificacion ? (
            <StarRating userComment={""} starValues={calificacion}></StarRating>
          ) : estadoLabel.toUpperCase() === "CERRADO" ? (
            "Pendiente de Calificar"
          ) : (
            ""
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
