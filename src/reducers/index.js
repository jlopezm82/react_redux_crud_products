import { combineReducers } from 'redux'; // To use multiple reducers
import productsReducer from './productsReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  products: productsReducer,
  alert: alertReducer
});
