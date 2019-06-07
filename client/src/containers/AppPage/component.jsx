import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ToolBar from '../../components/ToolBar'
import { pages } from '../../models/routes';

import { routes } from '../../models/routes';
const history = createBrowserHistory();

class AppPage extends React.Component {

  state = {
    dataToSearch: []
  }

  componentDidMount() {
    this.props.fetchRestaurants(this.props.filterBy);
    // fill dataToSearch with restaurants, tapas, ...
  }

  searchData = searchString => {
    console.log("searching : " + searchString);
    this.props.searchData(searchString);
  }

  render () {
    const { dataToSearch } = this.state;
    return (
      <Router history={history}>
        <ToolBar
          searchData={dataToSearch}
          searchAction={this.searchData}
          navData={pages}
        />
        {routes}
      </Router>
    )
  }
}

AppPage.propTypes = {
  app: PropTypes.object.isRequired,
  fetchRestaurants: PropTypes.func.isRequired,
  restaurants: PropTypes.object.isRequired,
  searchData: PropTypes.func.isRequired,
}

export default AppPage