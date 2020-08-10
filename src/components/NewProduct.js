import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useDispatch -> To execution the actions
                                                        // useSelector -> To access the state into the component

//Redux Actions
import { createNewProductAction } from '../actions/productActions';

const NewProduct = () => {

  // component state
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  // use useDispatch and it create a function
  const dispatch = useDispatch();

  // To communicate with the actions
  // Call the action from productAction
  const addProduct = (product) => dispatch( createNewProductAction(product) );

  const submitNewProduct = (event) => {
    event.preventDefault();

    // Validate form
    if ( name.trim() === '' || price <= 0 ) {
      return;
    }

    // Check errors

    // Create new product
    addProduct({
      name,
      price
    });
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
