import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProductAction } from '../actions/productActions'
import { useHistory } from 'react-router-dom';

const EditProduct = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  // new product state
  const [ product, setProduct ] = useState({
    name: '',
    price: ''
  });

  const productEdit = useSelector( state => state.products.productEdit );

  useEffect( () => {
    setProduct(productEdit);
  }, [productEdit] );

  const { id, name, price } = product;

  // get data from the form
  const onChangeForm = (event) => {
    setProduct({
      ...product,
      [event.target.name] : event.target.value
    })
  }

  const submitEditProduct = event => {
    event.preventDefault();

    dispatch( editProductAction(product) );

    history.push('/');
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Edit Product
            </h2>
            <form
              onSubmit={ submitEditProduct } >
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Product Name"
                  name="name"
                  value={name}
                  onChange={onChangeForm} />
              </div>
              <div className="form-group">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Product Name"
                  name="price"
                  value={price}
                  onChange={onChangeForm} />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
