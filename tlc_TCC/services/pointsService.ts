import api from "./api";

export const getPoints = () => api.get("?url=points");
export const createPoints = (data: any) => api.post("?url=points", data);
export const updatePoints = (data: any) => api.put("?url=points", data);
export const deletePoints = (data: any) => api.delete("?url=points", { data });