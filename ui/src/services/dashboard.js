import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getNoticias = async () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const config = {
    headers,
  };
  const { data } = await axios.get(`${API_URL}/noticias/`, config);
  return data;
};

export const getReclamosChart = async () => {
  const usuarioId = JSON.parse(sessionStorage.getItem("userData")).userId;
  const token = JSON.parse(sessionStorage.getItem("userData")).userToken;
  const headers = {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };
  const config = {
    headers,
  };
  const { data } = await axios.get(
    `${API_URL}/reclamo/chart/${usuarioId}/`,
    config
  );
  return data;
};
