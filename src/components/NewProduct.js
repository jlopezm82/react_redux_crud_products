import React, { useState } from 'react';

// Redux
// useDispatch -> To execution the actions
// useSelector -> To access the state into the component
import { useDispatch, useSelector } from 'react-redux';

//Redux Actions
import { createNewProductAction } from '../actions/productActions';
import { showAlertAction, hideAlertAction } from '../actions/alertActions';

const NewProduct = ({ history }) => {

  // component state
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  // use useDispatch and it create a function
  const dispatch = useDispatch();

  // Access store state
  const loading = useSelector( state => state.products.loading );
  const error = useSelector( state => state.products.error );
  const alert = useSelector( state => state.alert.alert );

  // To communicate with the actions
  // Call the action from productAction
  const addProduct = (product) => dispatch( createNewProductAction(product) );

  const submitNewProduct = (event) => {
    event.preventDefault();

    // Validate form
    if ( name.trim() === '' || price <= 0 ) {

      const alert = {
        message: 'All fields are mandatory',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch( showAlertAction(alert) );

      return;
    }

    // Thera are no errors
    dispatch( hideAlertAction() );

    // Create new product
    addProduct({
      name,
      price
    });

    // redirect
    history.push('/');
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>

            { alert ? <p className={alert.classes}> {alert.message} </p> : null }

            <form
              onSubmit={submitNewProduct}>
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Product Name"
                  name="name"
                  value={name}
                  onChange={ event => setName(event.target.value) } />
              </div>
              <div className="form-group">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Product Price"
                  name="price"
                  value={price}
                  onChange={ event => setPrice( Number(event.target.value) ) } />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                Add
              </button>
            </form>
            { loading ? <p>Loading...</p> : null }
            { error ? <p className="alert alert-danger p2 mt-4 text-center">There was an error!</p> : null }
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
