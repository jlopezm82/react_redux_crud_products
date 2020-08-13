import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_DOWNLOAD_PRODUCTS,
  DOWNLOAD_PRODUCTS_SUCCESS,
  DOWNLOAD_PRODUCTS_ERROR,
  GET_PRODUCT_DELETE,
  PRODUCT_DELETED_SUCCESS,
  PRODUCT_DELETED_ERROR,
  GET_PRODUCT_EDIT,
  START_EDITION_PRODUCT,
  PRODUCT_EDITED_SUCCESS,
  PRODUCT_EDITED_ERROR
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
});

// Select and delete product
export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch( getProductDelete(id) );
    try {
      await clientAxios.delete(`/products/${id}`);
      dispatch( deleteProductSuccess() );

      Swal.fire(
        'Deleted!',
        'Your product has been deleted.',
        'success'
      )
    } catch (error) {
      console.log(error);
      dispatch( deleteProductError() );
    }
  }
}

const getProductDelete = (id) => ({
  type: GET_PRODUCT_DELETE,
  payload: id
});

const deleteProductSuccess = () => ({
  type: PRODUCT_DELETED_SUCCESS
});

const deleteProductError = () => ({
  type: PRODUCT_DELETED_ERROR,
  payload: true
});

export function getProductEditAction( product ) {
  return (dispatch) => {
    dispatch( getProductEdit(product) );
  }
}

const getProductEdit = (product) => ({
  type: GET_PRODUCT_EDIT,
  payload: product
});

export function editProductAction(product) {
  return async (dispatch) => {
    dispatch( editProduct() );
    try {
      await clientAxios.put(`/products/${product.id}`, product);
      dispatch( editProductSucces(product) );
    } catch (error) {
      dispatch( editProductError() );
    }
  }
}

const editProduct = () => ({
  type: START_EDITION_PRODUCT
});

const editProductSucces = (product) => ({
  type: PRODUCT_EDITED_SUCCESS,
  payload: product
});

const editProductError = () => ({
  type: PRODUCT_EDITED_ERROR,
  payload: true
})
