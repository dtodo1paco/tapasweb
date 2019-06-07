import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { store } from './models/store';
import AppPage from './containers/AppPage'
import "./assets/styles/react-md-custom.scss"
//import './assets/styles/style';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppPage />
      </Provider>
    );
  }
}

export default App;
