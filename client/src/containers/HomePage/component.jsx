import React from "react";
import PropTypes from "prop-types";

import Loading from '../../components/Loading';
import RestaurantList from '../../components/RestaurantList'


class HomePage extends React.Component {

  render () {
    if (this.props.loading) return <Loading message="Fetching restaurants" />;
    return (
      <React.Fragment>
        <RestaurantList items={this.props.restaurants.items} />
      </React.Fragment>
    )
  }
}

HomePage.propTypes = {
  restaurants: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default HomePage