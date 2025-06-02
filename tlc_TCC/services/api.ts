import axios from "axios";

const api = axios.create({
  baseURL: "http://3ab6-2804-388-c334-c881-a5aa-cdfd-8600-11f1.ngrok-free.app/Projeto_TechLimp/backend/routes/api.php", // Troque pela URL do seu backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
