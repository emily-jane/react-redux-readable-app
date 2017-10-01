import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import categoriesReducer from './categoriesReducer';
import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  comments: commentsReducer,
  form: formReducer
});
