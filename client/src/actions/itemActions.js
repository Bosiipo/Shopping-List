import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// The function calls here; getItems, addItem and deleteItem are to be used from the frontend!
// Handles the data communication between the backend and the redux store for the frontend!

export const getItems = () => dispatch => {
  // Use dispatch to send the type and the data gotten from a request
  dispatch(setItemsLoading());
  axios
    .get('http://localhost:5000/api/items')
    .then(res => dispatch({ type: GET_ITEMS, payload: res.data }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
  // http://localhost:5000/api/items
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post('http://localhost:5000/api/items', item, tokenConfig(getState))
    .then(res => dispatch({ type: ADD_ITEM, payload: res.data }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`http://localhost:5000/api/items/${id}`, tokenConfig(getState))
    .then(res => dispatch({ type: DELETE_ITEM, payload: id }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
