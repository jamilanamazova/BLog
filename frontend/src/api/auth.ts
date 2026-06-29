import api from "./axios";

export const registerUser = (data: { email: string; username: string; password: string }) =>
  api.post("/auth/register", data);

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const getProfile = (token: string) =>
  api.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const updateProfile = (data: { username?: string; bio?: string; avatar_url?: string }) =>
  api.put('/auth/profile', data);