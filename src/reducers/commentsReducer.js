import { FETCH_POSTS_COMMENTS, CREATE_COMMENT, DELETE_COMMENT } from '../actions';

function comments (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS_COMMENTS :
      return action.payload;
    case CREATE_COMMENT :
      return [
        ...state,
        {...action.payload, voteScore: 1}
      ]
    case DELETE_COMMENT :
      return state.map((comment) => {
        return (comment.id === action.payload) ? {...comment, deleted: true} : comment
      })
    default :
      return state;
  }
}

export default comments;
