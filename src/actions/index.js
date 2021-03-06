import {
  getCategories,
  getPosts,
  getSinglePost,
  getPostsComments,
  postPost,
  postComment,
  deletePost,
  deleteComment,
  postPostVote,
  postCommentVote,
  putPostEdit,
  putCommentEdit
} from '../utils/api';
import uuidv4 from 'uuid/v4';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_SINGLE_POST = 'FETCH_SINGLE_POST';
export const FETCH_POSTS_COMMENTS = 'FETCH_POSTS_COMMENTS';
export const CREATE_POST = 'CREATE_POST';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const CHANGE_POST_VOTE = 'CHANGE_POST_VOTE';
export const CHANGE_COMMENT_VOTE = 'CHANGE_COMMENT_VOTE';
export const SORT_POSTS = 'SORT_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';

export const fetchCategories = () => dispatch => {
  getCategories()
    .then((response) => {
      return dispatch({
        type: FETCH_CATEGORIES,
        payload: response.data.categories
      })
    })
};

export function fetchPosts() {
  return dispatch => {
    getPosts()
    .then((response) =>
      Promise.all(
        response.data.map(post =>
          getPostsComments(post.id)
            .then(comments => (post.commentCount = comments.data.length))
            .then(() => post)
        )
      )
    )
    .then(response => dispatch({ type: FETCH_POSTS, payload: response }));
  };
}

export const fetchSinglePost = (id) => dispatch => {
    getSinglePost(id)
    .then((response) => {
      return dispatch({
        type: FETCH_SINGLE_POST,
        payload: response.data
      })
    })
};

export const fetchPostsComments = (postId) => dispatch => {
    getPostsComments(postId)
    .then((response) => {
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

  postPost(data).then(() => callback());

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
  deletePost(postId).then(() => callback());

  return {
    type: DELETE_POST,
    payload: postId
  }
}

export const removeComment = (commentId) => dispatch => {
  deleteComment(commentId)
  .then(() => {
    return dispatch({
      type: DELETE_COMMENT,
      payload: commentId
    })
  })
}

export const changePostVote = (postId, direction) => dispatch => {
  postPostVote(postId, direction)
  .then(() => {
    return dispatch({
      type: CHANGE_POST_VOTE,
      payload: {
        postId,
        direction
      }
    })
  })
}

export const changeCommentVote = (commentId, direction) => dispatch => {
  postCommentVote(commentId, direction)
  .then(() => {
    return dispatch({
      type: CHANGE_COMMENT_VOTE,
      payload: {
        commentId,
        direction
      }
    })
  })
}

export const sortPosts = (option) => dispatch => {
  return dispatch({
    type: SORT_POSTS,
    payload: option
  })
}

export function editPost(postId, data, callback) {
  putPostEdit(postId, data).then(() => callback());

  return {
    type: EDIT_POST,
    payload: data
  }
}

export const editComment = (body, commentId) => dispatch => {
  putCommentEdit(commentId, {body, timestamp: Date.now()})
  .then(() => {
    return dispatch({
      type: EDIT_COMMENT,
      payload: {
        body,
        commentId
      }
    })
  })
}
