import { getCategories, getPosts } from '../utils/api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_POSTS = 'FETCH_POSTS';

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
