import api from "./api";

export const getPoints = () => api.get("?url=ceps");
export const createPoints = (data: any) => api.post("?url=ceps", data);
export const updatePoints = (data: any) => api.put("?url=ceps", data);
export const deletePoints = (data: any) => api.delete("?url=ceps", { data });