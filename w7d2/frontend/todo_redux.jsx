import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const preloadedState = localStorage.state ?
    JSON.parse(localStorage.state) : {};
  let store = configureStore(preloadedState);
  store = applyMiddlewares(store, [addLoggingToDispatch]);
  const root = document.getElementById('content');
  ReactDOM.render(<Root store={store} />, root);
});

const addLoggingToDispatch = store => next => action => {
  console.log(action);
  console.log(store.getState());
  let res = next(action);
  console.log(store.getState());
  return res;
}

const applyMiddlewares = (store, middlewares) => {
  let dispatch = store.dispatch;
  middlewares.forEach(mw => dispatch = mw(store)(dispatch));
  return Object.assign({}, store, { dispatch });
}