import { FETCH_POSTS, FETCH_SINGLE_POST } from '../actions';

function posts (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS :
      return action.payload;
    case FETCH_SINGLE_POST :
      return action.payload;
    default :
      return state;
  }
}

export default posts;
