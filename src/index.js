import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import create from './redux/create';
import { Provider } from 'react-redux';

// store 의 생성.
// 이게 초기화 시점이라는 것을 명시적으로 해야 테스트하기도 좋다.
// 초기화 순서를 맞추기 용이해지기도함.
const store = create();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
