import { FETCH_CATEGORIES } from '../actions';

function categories (state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES :
      return action.payload;
    default :
      return state;
  }
}

export default categories;
