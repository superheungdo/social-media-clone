import API from "./";

export const getUser = (userId) => API.get(`/user/${userId}`);
export const updateUser = (userId, formData) =>
  API.put(`/user/${userId}`, formData);
export const getAllUser = () => API.get("/user");
export const followUser = (userId, data) =>
  API.put(`/user/${userId}/follow`, data);
export const unfollowUser = (userId, data) =>
  API.put(`/user/${userId}/unfollow`, data);
