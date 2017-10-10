import {
  SORT_POSTS
} from '../actions';

function sortPosts (state = "voteScore", action) {
  switch (action.type) {
    case SORT_POSTS :
      return action.payload;
    default :
      return state;
  }
}

export default sortPosts;
