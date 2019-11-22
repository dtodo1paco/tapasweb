import React from 'react';
import PropTypes from "prop-types";
import "./styles.css";
import {
  Autocomplete,
  Button,
  Toolbar,
  Drawer,
  } from 'react-md';

import { withRouter } from 'react-router';
import NavItemLink from '../NavItemLink';

class ToolBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      value: '',
      menuVisible: false,
    }
    this.navItems = props.navData.map( item => (
      item.divider
        ? item
        : <NavItemLink key={item.path}
            {...item}
            onClick={() => this.setPage(item.path, item.primaryText)}
          />
    ));
  }

  openDrawerLeft = () => {
    this.setState({ menuVisible: true });
  };
  closeDrawer = () => {
    this.setState({ menuVisible: false });
  };
  setPage = (key, page) => {
    console.log("Clicked: " + key);
    this.navItems = this.navItems.map((item) => {
      if (item.divider) {
        return item;
      }
      return { ...item, active: item.path === key };
    });
    this.setState({ menuVisible: false });
  };

  handleVisibility = (visible) => {
    this.setState({ visible });
  };

  handleNavClick = () => {
    this.setState({ searching: false });
  };

  handleActionClick = () => {

    if (this.state.searching) {
      if (this.state.value.length !== 0) {
        // TODO: handle search button click when searching && value != ''
        this.props.searchAction(this.state.value);
      } else {
        this.setState({ value: '', searching: false });
      }
    } else {
      this.setState({ searching: true });
    }
  };

  handleChange = (value) => {
    this.setState({ value });
  };

  handleAutocomplete = (id, index, matches) => {
    const toolbar = document.getElementById('fixed-toolbar');
    const item = document.getElementById(id);
    if (!item || !toolbar) {
      return;
    }

    let scrollTop = item.offsetTop - toolbar.offsetHeight;
    let scrollContainer = null;
    if (this.props.mobile) {
      scrollContainer = document.getElementById('phone-emulator-demo');
    } else {
      scrollContainer = toolbar.parentNode;
      scrollTop -= scrollContainer.parentNode.querySelector('header').offsetHeight;
    }

    scrollContainer.scrollTop = scrollTop;
    this.setState({ value: matches[index].name });
  };


  render () {
    const { searching, value, menuVisible } = this.state;
    const { searchData } = this.props;
    let title = 'Tapasweb';
    if (searching) {
      title = (
        <Autocomplete
          id="search-pastries"
          block
          data={searchData}
          dataLabel="name"
          dataValue="key"
          value={value}
          onChange={this.handleChange}
          placeholder="Search"
          onAutocomplete={this.handleAutocomplete}
          toolbar
          autoFocus
        />
      );
    }
    const closeBtn = <Button icon onClick={this.closeDrawer}>{menuVisible ? 'arrow_back' : 'close'}</Button>;

    return (
      <React.Fragment>
        <Toolbar
          id="fixed-toolbar"
          fixed={false}
          colored
          nav={(
            <Button
              key="nav"
              icon
              onClick={
                searching
                ? this.handleNavClick
                : menuVisible
                  ? this.closeDrawer
                  : this.openDrawerLeft
                }
            >
              {searching ? 'arrow_back' : 'menu'}
            </Button>
          )}
          actions={(
            <Button
              key="action"
              icon
              onClick={this.handleActionClick}
            >
                  {(value.length === 0 && searching)
                    ? 'close'
                    : 'search'
                  }
            </Button>
          )}
          title={title}
          titleId="search"
          className="gray-toolbar"
        />
        <Drawer
          id="simple-drawer"
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={menuVisible}
          position='left'
          onVisibilityChange={this.handleVisibility}
          navItems={this.navItems}
          header={(
            <Toolbar
              nav={menuVisible ? null : closeBtn}
              actions={menuVisible ? closeBtn : null}
              className="md-divider-border md-divider-border--bottom"
            />
          )}
        />
      </React.Fragment>

    )
  }
};

ToolBar.propTypes = {
  searchAction: PropTypes.func.isRequired,
  searchData: PropTypes.array.isRequired,
  navData: PropTypes.array.isRequired,
}

export default withRouter(ToolBar);