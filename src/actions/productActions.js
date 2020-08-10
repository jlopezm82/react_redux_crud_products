import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR
} from '../types';
import clientAxios from '../config/axios';

// Create new products
export function createNewProductAction( product ) {
  return async (dispatch) => {
    dispatch( addProduct() );

    try {
      // Insert in the API
      await clientAxios.post('products', product);

      // set state
      dispatch( addProductSuccess(product) );
    } catch (error) {
      console.log(error);
      //if there is a error change the state
      dispatch( addProductError(true) );
    }
  }
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true
})

// if the product is saved in the database
const addProductSuccess = product => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product
})

// There was a error
const addProductError = stateError => ({
  type: ADD_PRODUCT_ERROR,
  payload: stateError
});
