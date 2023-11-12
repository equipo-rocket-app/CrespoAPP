/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";

export default function GraficoTorta({ titulo, data }) {
  let emptyData = true;
  data.forEach(element => {
    if (element.value !== 0) {
      emptyData = false;
    }
  });

  return (
    <Box>
      <Typography component="h1" variant="h5" align="center" py={"1rem"}>
        {titulo}
      </Typography>
      <PieChart
        series={
          emptyData
            ? (data = [
                {
                  data: [{ id: 0, value: 1, label: "Sin Datos" }],
                },
              ])
            : [{ data }]
        }
        height={200}
        width={400}
      />
    </Box>
  );
}
