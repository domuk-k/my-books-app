import books from './books';
import auth from './auth';
import width from './width';
import { combineReducers } from 'redux';

export default combineReducers({ auth, books, width });
