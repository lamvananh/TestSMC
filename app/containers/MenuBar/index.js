
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { compose } from 'redux';
import reducer from '../Tabs/reducer';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { makeSideBarOpen } from './selectors';
import { addTab } from '../Tabs/actions';
import { changeSideBarOpened } from './actions';
import $ from 'jquery';
const key = 'menu';

export function MenuBar(props) {
  useInjectReducer({ key, reducer });

  useEffect(() => {
    // load 3 mock tab to screen
    //  onLoadMockTab();
  }, []);

  const menuListProps = {

  };
  function converKeyToPath(key) {
    if (key == "home")
      return "/";
    else
      return "/" + key;

  }
  return (
    <React.Fragment>    
      <SideNav className="side-menu" id="smcSideMenu"
        onSelect={(selected) => {
          // Add your code here
          console.log("Menu......", selected);
          props.onAddTabItem(converKeyToPath(selected));
        }}
      >
        <SideNav.Toggle id="vsm-toogle-menu" onClick={(e) => {
          // props.onChangeSideBarOpened(true);
          if ($('#smcSideMenu').width() > 100) {
            //dịch chuyển appContentContainer margin left đúng bằng khoảng cách chiều rộng của sideMenu
            $('#appContentContainer').css("margin-left", "var(--side-menu-width)");
            $("#appHeader").css("margin-left", "calc(var(--side-menu-width) * -1)");

          } else {
            $('#appContentContainer').css("margin-left", "250px");
            $("#appHeader").css("margin-left", "-250px");

          }
        }}
        />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <FontAwesomeIcon icon={faHome} style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Home
          </NavText>
          </NavItem>
          <NavItem eventKey="parking">
            <NavIcon>
              <FontAwesomeIcon icon={faChartLine} style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Parking
            </NavText>
            <NavItem eventKey="parking/manager">
              <NavText>
                Manager
                </NavText>
            </NavItem>
            <NavItem eventKey="parking/report">
              <NavText>
                Report
                </NavText>
            </NavItem>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </React.Fragment>
  );
}

MenuBar.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  // isSideBarOpen: makeSideBarOpen()
});

export function mapDispatchToProps(dispatch) {
  return {
    onAddTabItem: item => {
      dispatch(addTab(item));
    },
    onChangeSideBarOpened: isOpened => {
      dispatch(changeSideBarOpened(isOpened));
    }
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
