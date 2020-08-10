import { combineReducers } from 'redux'; // To use multiple reducers
import productsReducer from './productsReducer';

export default combineReducers({
  products: productsReducer
});
