import api from "./api";

export const getCeps = (data:any) => api.get("?url=ceps");
export const createCeps = (data: any) => api.post("?url=ceps", data);
