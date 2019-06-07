import { RECEIVED_OK, ENTITY_NAME } from './constants';
import { setLoading, resetLoading, setErrorPage } from '../app/actions'

import api from '../api';

const API_MODEL_NAME = `/${ENTITY_NAME.toLowerCase()}`;

export function fetchEntity_OK (payload) {
  return { payload, type: RECEIVED_OK }
};


// THUNK
export const fetchRestaurants = filter => dispatch => {
  dispatch(setLoading());
  //Axios request:
  api.postModel(API_MODEL_NAME, filter)
    .then(response => {
      dispatch(resetLoading());
      dispatch(fetchEntity_OK(response.data));
    })
    .catch(error => {
      dispatch(resetLoading());
      dispatch(setErrorPage(error));
    });
};