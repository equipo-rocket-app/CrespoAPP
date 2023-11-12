import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ReclamoCard() {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: "90vw",
        maxHeight: "40vh",
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Img
            alt="complex"
            src="https://source.unsplash.com/random?wallpapers"
            sx={{ height: "2rem" }}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ margin: "0.5rem 0" }}
              >
                05/09/23
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Agua Potable / Rotura de caño o Perdida
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ margin: "0.5rem 0" }}
              >
                ID_Reclamo: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                sx={{ cursor: "pointer", display: "inline-block" }}
                variant="body2"
              >
                ESTADO
              </Typography>
              <Typography
                sx={{
                  cursor: "pointer",
                  display: "inline-block",
                  float: "right",
                }}
                variant="body2"
              >
                ESTRELLITAS
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
