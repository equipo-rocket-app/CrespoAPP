import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getBarrios = async () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const config = {
    headers,
  };
  const { data } = await axios.get(`${API_URL}/barrios/`, config);
  return data;
};

export const getCalles = async () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const config = {
    headers,
  };
  const { data } = await axios.get(`${API_URL}/calles/`, config);
  return data;
};
