import {
  FETCH_POSTS,
  FETCH_SINGLE_POST,
  CREATE_POST,
  DELETE_POST,
  CHANGE_POST_VOTE
} from '../actions';

function posts (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS :
      return action.payload;
    case FETCH_SINGLE_POST :
      return action.payload;
    case CREATE_POST :
      return [
        ...state,
        action.payload
     ]
    case DELETE_POST :
      const newState = Array.isArray(state) ? state : [state]
      return newState.map((post) => {
        return (post.id === action.payload) ? {...post, deleted: true} : post
      })
    case CHANGE_POST_VOTE :
      return state.map((post) => {
        const currentScore = post.voteScore
        return (post.id === action.payload.postId) ? {...post, voteScore: action.payload.direction === "upVote" ? currentScore + 1 : currentScore - 1} : post
      })
    default :
      return state;
  }
}

export default posts;
