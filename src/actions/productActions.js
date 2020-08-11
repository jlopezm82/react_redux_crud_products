import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_DOWNLOAD_PRODUCTS,
  DOWNLOAD_PRODUCTS_SUCCESS,
  DOWNLOAD_PRODUCTS_ERROR
} from '../types';
import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

// Create new products
export function createNewProductAction( product ) {
  return async (dispatch) => {
    dispatch( addProduct() );

    try {
      // Insert in the API
      await clientAxios.post('products', product);

      // set state
      dispatch( addProductSuccess(product) );

      // Alert
      Swal.fire(
        'Success!',
        'The product was added successfully.',
        'success'
      )
    } catch (error) {
      console.log(error);
      //if there is a error change the state
      dispatch( addProductError(true) );

      // Alert error
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error.'
      })
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

export function getProductsAction() {
  return async (dispatch) => {
    dispatch( downloadProducts() );
    try {
      const response = await clientAxios.get('/products');
      dispatch( downloadProductsSuccess( response.data ) );
    } catch (error) {
      dispatch( downloadProductsError() );
    }
  }
}

const downloadProducts = () => ({
  type: START_DOWNLOAD_PRODUCTS,
  payload: true
});

const downloadProductsSuccess = products => ({
  type: DOWNLOAD_PRODUCTS_SUCCESS,
  payload: products
});

const downloadProductsError = () => ({
  type: DOWNLOAD_PRODUCTS_ERROR,
  payload: true
})
