import {
  RESET_ERRORS, SET_ERROR_PAGE, SET_ERROR_MODAL,
  SET_LOADING, RESET_LOADING, SEARCH_OK }
  from './constants'

const NO_ERRORS = {
  modal: null,
  page: null,
}
const initialState = {
  loading: false,
  errors: NO_ERRORS
}

const reducer = (state = initialState, action = {type:'', payload:null}) => {
  switch (action.type) {
    case RESET_ERRORS:
      return Object.assign({}, state, {
        errors: NO_ERRORS
      })
    case SET_ERROR_PAGE:
      return Object.assign({}, state, {
        errors: {
          modal: null,
          page: ((action.err).hasOwnProperty('message'))?action.err.message:action.err
        }
      })
    case SET_ERROR_MODAL:
      return Object.assign({}, state, {
        errors: {
          page: null,
          modal: ((action.err).hasOwnProperty('message'))?action.err.message:action.err
        }
      })
    case RESET_LOADING:
      return Object.assign({}, state, {
        loading: false
      })
    case SET_LOADING:
      return Object.assign({}, state, {
        loading: true
      })
    case SEARCH_OK:
      return Object.assign({}, state, {
        search: {
          query: action.payload.query,
          result: action.payload.result,
        }
      })
    default:
      return state;
  }
}

export default reducer;