import api from "./api";

export const getUsers = () => api.get("?url=users");
export const createUser = (data: any) => api.post("?url=users", data);
export const loginUser = (data:any) => api.post("?url=login", data)
export const updateUser = (data: any) => api.put("?url=users", data);
export const deleteUser = (data: any) => api.delete("?url=users", { data });
export const getUsersbyEmail = (email_user: any) => api.get("?url=login", { params: { email_user } });