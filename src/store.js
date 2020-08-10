import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // To use async functions with redux
import reducer from './reducers'; // To find index.js

const store = createStore(
  reducer,
  compose( applyMiddleware(thunk),
    typeof window === 'object' &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
        window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;
