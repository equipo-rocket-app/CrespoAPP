import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function ImagenesList({ img }) {
  return (
    <ImageList
      sx={{ width: "90%", height: "auto", maxWidth: "25rem" }}
      cols={1}
    >
      <ImageListItem>
        <img src={img} loading="lazy" />
      </ImageListItem>
    </ImageList>
  );
}
