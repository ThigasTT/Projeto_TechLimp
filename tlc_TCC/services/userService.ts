import api from "./api";

export const getUsers = () => api.get("?url=users");
export const createUser = (data: any) => api.post("?url=users", data);
export const loginUser = (data:any) => api.post("?url=users", data)
export const updateUser = (data: any) => api.put("?url=users", data);
export const deleteUser = (data: any) => api.delete("?url=users", { data });