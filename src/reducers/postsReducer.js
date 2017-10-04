import {
  FETCH_POSTS,
  FETCH_SINGLE_POST,
  CREATE_POST,
  DELETE_POST
} from '../actions';

function posts (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS :
      return action.payload;
    case FETCH_SINGLE_POST :
      return [action.payload];
    case CREATE_POST :
      return [
        ...state,
        action.payload
     ]
    case DELETE_POST :
      return state.map((post) => {
        return (post.id === action.payload) ? {...post, deleted: true} : post
      })
    default :
      return state;
  }
}

export default posts;
