import api from "./api";

export const getCeps = (cep: any) => api.get("?url=ceps", { params: { cep } });
export const createCeps = (cep: any) => api.post("?url=ceps",cep);
