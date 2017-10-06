import axios from 'axios';

const api = "http://localhost:5001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const AUTH_HEADERS = { 'Authorization': token, 'Accept': 'application/json', };

axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export function getCategories() {
  return axios.get(`${api}/categories`);
}

export function getPosts() {
  return axios.get(`${api}/posts`);
}

export function getSinglePost(postId) {
  return axios.get(`${api}/posts/${postId}`);
}

export function getPostsComments(postId) {
  return axios.get(`${api}/posts/${postId}/comments`);
}

export function postPost(data) {
  return axios.post(`${api}/posts`, data);
}

export function postComment(data) {
  return axios.post(`${api}/comments`, data);
}

export function deletePost(postId) {
  return axios.delete(`${api}/posts/${postId}`);
}

export function deleteComment(commentId) {
  return axios.delete(`${api}/comments/${commentId}`);
}
