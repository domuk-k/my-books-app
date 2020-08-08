import { createStore, applyMiddleware } from 'redux';
import reducer from './modules/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import TokenService from '../services/TokenService';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './middlewares/saga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export default function create() {
  const store = createStore(
    reducer(history),
    {
      auth: {
        token: TokenService.getToken(),
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(
      applyMiddleware(thunk, routerMiddleware(history), sagaMiddleware),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
