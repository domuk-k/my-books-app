import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import TokenService from './services/TokenService';

export default function create() {
  return createStore(
    reducer,
    {
      auth: {
        token: TokenService.getToken(),
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(applyMiddleware(thunk)),
  );
}
