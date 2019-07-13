import { createStore, applyMiddleware, compose } from 'redux';
// import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers';
import freeze from 'redux-freeze';
import * as actionCreators from './actions';

let enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__({ actionCreators, serialize: true, trace: true });
if (!enhancer) {
  console.warn('Install Redux DevTools Extension to inspect the app state: ' +
  'https://github.com/zalmoxisus/redux-devtools-extension#installation')
  enhancer = void 0;
}

// const loggerMiddleware = createLogger();

let middlewares = [
  thunkMiddleware,
];

// add the freeze dev middleware
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze)
  // middlewares.push(loggerMiddleware)
}

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// create the store
const store = createStore(rootReducer, compose(middleware),enhancer);

window.forms = [];

export { store };