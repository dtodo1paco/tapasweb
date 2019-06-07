/* NavItemLink.jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontIcon, ListItem } from 'react-md';

/**
 * Due to the fact that react-router uses context and most of the components
 * in react-md use PureComponent, the matching won't work as expected since
 * the PureComponent will block the context updates. This is a simple wrapper
 * with Route to make sure that the active state is correctly applied after
 * an item has been clicked.
 */
const NavItemLink = ({ label, path, icon, active, onClick }) => {
  let leftIcon;
  if (icon) {
    leftIcon = <FontIcon>{icon}</FontIcon>;
  }
  return (
    <ListItem
      component={Link}
      active={active}
      to={path}
      primaryText={label}
      leftIcon={leftIcon}
      onClick={onClick}
    />
  );
};

NavItemLink.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string,
  active: PropTypes.bool,
  icon: PropTypes.node,
};
export default NavItemLink;