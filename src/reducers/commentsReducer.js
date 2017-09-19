import { FETCH_POSTS_COMMENTS } from '../actions';

function comments (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS_COMMENTS :
      return action.payload;
    default :
      return state;
  }
}

export default comments;
