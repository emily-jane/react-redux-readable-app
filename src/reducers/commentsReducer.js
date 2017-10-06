import { FETCH_POSTS_COMMENTS, CREATE_COMMENT } from '../actions';

function comments (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS_COMMENTS :
      return action.payload;
    case CREATE_COMMENT :
      return [
        ...state,
        {...action.payload, voteScore: 1}
      ]
    default :
      return state;
  }
}

export default comments;
