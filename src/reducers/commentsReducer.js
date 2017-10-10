import {
  FETCH_POSTS_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  CHANGE_COMMENT_VOTE
} from '../actions';

function comments (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS_COMMENTS :
      return action.payload
    case CREATE_COMMENT :
      return [
        ...state,
        {...action.payload, deleted: false, voteScore: 1}
      ]
    case DELETE_COMMENT :
      return state.map((comment) => {
        return (comment.id === action.payload) ? {...comment, deleted: true} : comment
      })
    case CHANGE_COMMENT_VOTE :
      return state.map((comment) => {
        const currentScore = comment.voteScore
        return (comment.id === action.payload.commentId) ? {...comment, voteScore: action.payload.direction === "upVote" ? currentScore + 1 : currentScore - 1} : comment
      })
    default :
      return state;
  }
}

export default comments;
