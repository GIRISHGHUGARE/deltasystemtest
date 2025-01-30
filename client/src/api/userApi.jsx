import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/users";

export const fetchUsers = () => axios.get(API_URL);
export const addUser = (userData) => axios.post(API_URL, userData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateUser = (id, userData) => axios.put(`${API_URL}/${id}`, userData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
export const toggleUserStatus = (id) => axios.patch(`${API_URL}/status/${id}`);
