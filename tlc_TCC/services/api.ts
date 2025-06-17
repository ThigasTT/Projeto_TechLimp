import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.123.23/Projeto_TechLimp/backend/routes/api.php", // Troque pela URL do seu backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
