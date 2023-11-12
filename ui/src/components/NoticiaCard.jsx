import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function noticiaCard({ fecha, titulo, img, link }) {
  return (
    <Link href={link} overlay underline="none">
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <CardMedia
          component="div"
          sx={{
            pt: "56.25%",
          }}
          image={img}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom style={{ fontSize: "1rem" }}>
            {titulo}
          </Typography>
        </CardContent>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom style={{ fontSize: "1rem" }}>
            {fecha}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
