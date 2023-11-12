/* eslint-disable no-unused-vars */
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NoticiaCard from "./NoticiaCard";

import { getNoticias } from "../services/dashboard";
import MyLoader from "./MyLoader";
import { Typography } from "@mui/material";

export default function CardSlider() {
  const {
    data: noticiasList,
    error: errorNoticiasList,
    isLoading: isLoadingNoticiasList,
  } = useQuery(["noticiasList"], () => getNoticias());

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1.05,
    slidesToScroll: 1,
  };

  return (
    <>
      {errorNoticiasList && (
        <Typography>Hubo un error al carga la sección de Noticias</Typography>
      )}
      {isLoadingNoticiasList && <MyLoader></MyLoader>}
      {noticiasList && (
        <Slider {...settings}>
          {noticiasList.map(noticia => (
            <NoticiaCard
              titulo={noticia.titulo}
              img={noticia.imagen}
              link={noticia.link}
              fecha={noticia.fecha}
              key={noticia.id}
            />
          ))}
        </Slider>
      )}
    </>
  );
}
