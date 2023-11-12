import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getTiposReclamos = async () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const { data } = await axios.get(`${API_URL}/reclamos/tipos/`, { headers });
  return data;
};

export const getUrgenciasReclamos = async () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const { data } = await axios.get(`${API_URL}/reclamos/urgencias/`, {
    headers,
  });
  return data;
};

export const getReclamoById = async reclamoId => {
  const token = JSON.parse(sessionStorage.getItem("userData")).userToken;
  const headers = {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };
  const config = {
    headers,
  };
  const { data } = await axios.get(`${API_URL}/reclamo/${reclamoId}/`, config);
  return data;
};

export const getReclamosByIdUser = async userId => {
  const token = JSON.parse(sessionStorage.getItem("userData")).userToken;

  const headers = {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };
  const config = {
    headers,
  };
  const { data } = await axios.get(
    `${API_URL}/reclamos/user/${userId}/`,
    config
  );
  return data;
};

export const postReclamos = async data => {
  const token = JSON.parse(sessionStorage.getItem("userData")).userToken;

  const headers = {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };
  const config = {
    headers,
  };
  const response = await axios.post(`${API_URL}/reclamos/nuevo/`, data, config);
  return response;
};

export const patchReclamo = async ({ reclamoId, data, isEmployee = false }) => {
  const token = JSON.parse(sessionStorage.getItem("userData")).userToken;

  if (isEmployee) {
    data = {
      ...data,
      estado: 3,
    };
  }

  const headers = {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };
  const config = {
    headers,
  };
  const response = await axios.patch(
    `${API_URL}/reclamos/update/${reclamoId}`,
    data,
    config
  );
  return response;
};
