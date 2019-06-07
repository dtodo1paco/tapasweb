import { connect } from 'react-redux';

// Import component
import Component from './component';

//import { fetchRestaurants } from '../../models/restaurant/actions';
import ACTIONS from '../../models/actions';
const appActions = ACTIONS.appActions;
const restaurantActions = ACTIONS.restaurantActions;


// Add Redux State to Component props
const mapStateToProps = state => ({
  restaurants: state.restaurants,
  app: state.app
});

// dispatch actions to components props
const mapDispatchToProps = {
  fetchRestaurants: restaurantActions.fetchRestaurants,
  searchData: appActions.searchData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
