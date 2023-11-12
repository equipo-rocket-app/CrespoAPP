import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function StarRating({ starValues, userComment }) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating name="read-only" value={starValues} readOnly />
      <Typography variant="body2">{userComment}</Typography>
    </Box>
  );
}
