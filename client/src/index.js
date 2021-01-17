import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ant design import
import 'antd/dist/antd.css';
// redux의 provider
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
// store에서 promise 객체 사용 - 객체 밖에 못 받는데 이 미들웨어를 사용하면 promise를 받을 수 있음
import promiseMiddleware from 'redux-promise';
// store에서 function 사용
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
