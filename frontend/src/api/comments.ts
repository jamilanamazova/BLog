import api from "./axios";

export const getComments = (postId: number | string) =>
  api.get(`/posts/${postId}/comments`);

export const createComment = (postId: number | string, content: string, parentId?: number) =>
  api.post(`/posts/${postId}/comments`, { content, parent_id: parentId });