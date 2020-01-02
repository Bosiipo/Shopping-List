import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

// The function calls here; getItems, addItem and deleteItem are to be used from the frontend!
// Handles the data communication between the backend and the redux store for the frontend!

export const getItems = () => dispatch => {
  // Use dispatch to send the type and the data gotten from a request
  dispatch(setItemsLoading());
  axios
    .get('https://stormy-woodland-60272.herokuapp.com/api/items')
    .then(res => dispatch({ type: GET_ITEMS, payload: res.data }));
    // dispatch({ type: GET_ITEMS, payload: res.data })
  // console.log(res)
  // http://localhost:5000/api/items
};

export const addItem = item => dispatch => {
  axios
    .post('https://stormy-woodland-60272.herokuapp.com/api/items', item)
    .then(res => dispatch({ type: ADD_ITEM, payload: res.data }));

    // https://guarded-anchorage-96530.herokuapp.com
    // http://localhost:5000/api/items


  // fetch('/api/items', item, {
  //   method: 'POST',
  //   body: JSON.stringify(item),
  //   headers: 'Content-Type: application/json'
  // })
  //   .then(res => res.json())
  //   .then(res => console.log(res));
};

export const deleteItem = id => dispatch => {
  axios
    .delete(`https://stormy-woodland-60272.herokuapp.com/api/items/${id}`)
    .then(res => dispatch({ type: DELETE_ITEM, payload: id }));
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
