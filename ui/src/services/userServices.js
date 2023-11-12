/* eslint-disable camelcase */
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const logIn = async (username, password) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const data = {
    username,
    password,
  };
  const response = await axios.post(`${API_URL}/login/`, JSON.stringify(data), {
    headers,
  });
  return response;
};

export const logOut = async () => {
  const token = JSON.parse(sessionStorage.getItem("userData")).userToken;

  const headers = {
    Authorization: `Token ${token}`,
  };
  const config = {
    headers,
  };

  const response = await axios.post(`${API_URL}/logout/`, null, config);
  return response;
};

export const crearUsuario = async (
  first_name,
  last_name,
  email,
  password,
  direccion_calle,
  direccion_nro,
  celular
) => {
  const data = {
    first_name,
    last_name,
    email,
    password,
    direccion_calle,
    direccion_nro,
    celular,
  };
  const response = await axios.post(`${API_URL}/usuarios/nuevo/`, data);
  return response;
};

export const reclamosPorUsuario = async idUsuario => {
  const token = JSON.parse(sessionStorage.getItem("userData")).userToken;

  const headers = {
    token,
  };
  const response = await axios.post(`${API_URL}/reclamos/?user=${idUsuario}`, {
    headers,
  });
  return response;
};
