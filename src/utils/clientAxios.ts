import axios from "axios";

const urlAxios = axios.create({
  baseURL: "http://localhost:3001",
});

export default urlAxios;
