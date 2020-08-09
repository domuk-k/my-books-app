import books from './books';
import auth from './auth';
import width from './width';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export default history =>
  combineReducers({
    auth,
    books,
    width,
    router: connectRouter(history),
  });
