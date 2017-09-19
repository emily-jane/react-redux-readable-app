import { getCategories, getPosts, getSinglePost, getPostsComments } from '../utils/api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_SINGLE_POST = 'FETCH_SINGLE_POST';
export const FETCH_POSTS_COMMENTS = 'FETCH_POSTS_COMMENTS';

export const fetchCategories = () => dispatch => {
  getCategories()
    .then(function (response) {
      return dispatch({
        type: FETCH_CATEGORIES,
        payload: response.data.categories
      })
    })
};

export const fetchPosts = () => dispatch => {
    getPosts()
    .then(function (response) {
      return dispatch({
        type: FETCH_POSTS,
        payload: response.data
      })
    })
};

export const fetchSinglePost = (id) => dispatch => {
    getSinglePost(id)
    .then(function (response) {
      return dispatch({
        type: FETCH_SINGLE_POST,
        payload: response.data
      })
    })
};

export const fetchPostsComments = (postId) => dispatch => {
    getPostsComments(postId)
    .then(function (response) {
      return dispatch({
        type: FETCH_POSTS_COMMENTS,
        payload: response.data
      })
    })
};
