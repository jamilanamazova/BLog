import api from "./axios";


export const getPosts = () => api.get("/posts");

export const getPostById = (id: number | string) => api.get(`/posts/${id}`);

export const getMyPosts = () => api.get("/posts/my-posts");

export const createPost = (data: {
  title: string;
  content: string;
  image_url?: string;
  category?: string;
}) => api.post("/posts", data);

export const getMyFavorites = () =>
  api.get('/posts/favorites/me');

export const removeFavorite = (postId: number) =>
  api.delete(`/posts/${postId}/favorite`);

export const toggleFavorite = (postId: number) =>
  api.post(`/posts/${postId}/favorite`);

export const getMyLikes = () => api.get('/posts/liked');

export const toggleLike = (postId: number) =>
  api.post(`/posts/${postId}/like`);

export const removeLike = (postId: number) =>
  api.delete(`/posts/${postId}/like`);