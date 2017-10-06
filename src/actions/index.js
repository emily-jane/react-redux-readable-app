import {
  getCategories,
  getPosts,
  getSinglePost,
  getPostsComments,
  postPost,
  postComment,
  deletePost
} from '../utils/api';
import uuidv4 from 'uuid/v4';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_SINGLE_POST = 'FETCH_SINGLE_POST';
export const FETCH_POSTS_COMMENTS = 'FETCH_POSTS_COMMENTS';
export const CREATE_POST = 'CREATE_POST';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_POST = 'DELETE_POST';

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

export function createPost(props, callback) {
  const { title, body, author, category } = props;

  const data = {
    id: uuidv4(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category
  }

  const request = postPost(data).then(() => callback());

  return {
    type: CREATE_POST,
    payload: data
  }
}

export const createComment = (body, author, parentId) => dispatch => {
  const data = {
    id: uuidv4(),
    timestamp: Date.now(),
    body,
    author,
    parentId
  }

  postComment(data)
  .then(() => {
    return dispatch({
      type: CREATE_COMMENT,
      payload: data
    })
  })
}

export function removePost(postId, callback) {
  const request = deletePost(postId).then(() => callback());

  return {
    type: DELETE_POST,
    payload: postId
  }
}
