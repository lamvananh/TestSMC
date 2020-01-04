
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import messages from './messages';
import reducer from './reducer';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine } from '@fortawesome/free-solid-svg-icons'
const key = 'menu';

export function MenuBar({

}) {
  useInjectReducer({ key, reducer });

  useEffect(() => {
    // load 3 mock tab to screen
    //  onLoadMockTab();
  }, []);

  const menuListProps = {

  };

  return (
    <SideNav className = "side-menu"
      onSelect={(selected) => {
        // Add your code here
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon>
          <FontAwesomeIcon icon= {faHome} style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            Home
            </NavText>
        </NavItem>
        <NavItem eventKey="charts">
          <NavIcon>
          <FontAwesomeIcon icon= {faChartLine} style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            Charts
            </NavText>
          <NavItem eventKey="charts/linechart">
            <NavText>
              Line Chart
                </NavText>
          </NavItem>
          <NavItem eventKey="charts/barchart">
            <NavText>
              Bar Chart
                </NavText>
          </NavItem>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

MenuBar.propTypes = {

};

const mapStateToProps = createStructuredSelector({

});

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MenuBar);
