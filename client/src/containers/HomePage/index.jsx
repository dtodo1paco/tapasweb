import { connect } from 'react-redux';

// Import component
import Component from './component';

// Add Redux State to Component props
const mapStateToProps = state => ({
  restaurants: state.restaurants,
  loading: state.app.loading,
});

// dispatch actions to components props
const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
