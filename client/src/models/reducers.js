import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import restaurantReducer from './restaurant/reducer';
import appReducer from './app/reducer';

export const rootReducer = combineReducers({
  form: formReducer,
  restaurants: restaurantReducer,
  app: appReducer
});