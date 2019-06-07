import { RECEIVED_OK, SET_FILTER } from './constants';

const initialState = {
  items: [],
  filterBy: {},
}

const reducer = (state = initialState, action = '') => {
  switch (action.type) {
    case RECEIVED_OK:
      return Object.assign({}, state, {
        items: action.payload.slice(),
      })
    case SET_FILTER:
      return Object.assign({}, state, {
        filterBy: action.payload,
      })
    default:
      return state;
  }
}

export default reducer;