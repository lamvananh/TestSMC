import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { compose } from 'redux';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from '@trendmicro/react-sidenav';
import reducer from '../Tabs/reducer';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { makeSideBarOpen } from './selectors';
import { addTab } from '../Tabs/actions';
import { changeSideBarOpened } from './actions';
import homeLogo from '../../images/menu_home.svg';
import fireLogo from '../../images/menu_fire.svg';
import accessLogo from '../../images/menu_access.svg';
import starLogo from '../../images/menu_star.svg';
import bmsLogo from '../../images/menu_bms.svg';
import cameraLogo from '../../images/menu_camera.svg';
import parkingLogo from '../../images/menu_parking.svg';
import environmentLogo from '../../images/040-enviroment.svg';
import emergencyLogo from '../../images/menu_emergency.svg';
import $ from 'jquery';
const key = 'menu';

export function MenuBar(props) {
  useInjectReducer({ key, reducer });

  useEffect(() => {
    // load 3 mock tab to screen
    //  onLoadMockTab();
  }, []);

  const menuListProps = {};
  function converKeyToPath(key) {
    if (key == 'home') return '/';
    return `/${key}`;
  }
  return (
    <React.Fragment>
      <SideNav
        className="side-menu"
        id="smcSideMenu"
        onSelect={selected => {
          // Add your code here
          props.onAddTabItem(converKeyToPath(selected));
        }}
      >
        <SideNav.Toggle
          id="vsm-toogle-menu"
          onClick={e => {
            // props.onChangeSideBarOpened(true);
            if ($('#smcSideMenu').width() > 100) {
              // dịch chuyển appContentContainer margin left đúng bằng khoảng cách chiều rộng của sideMenu
              $('#appContentContainer').css(
                'margin-left',
                'var(--side-menu-width)',
              );
              $('#appHeader').css(
                'margin-left',
                'calc(var(--side-menu-width) * -1)',
              );
            } else {
              $('#appContentContainer').css('margin-left', '250px');
              $('#appHeader').css('margin-left', '-250px');
            }
          }}
        />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <img src={homeLogo} alt="menu" style={{ width: '20px' }} />
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          <NavItem eventKey="map">
            <NavIcon>
              <img src={cameraLogo} alt="menu" style={{ width: '25px' }} />
            </NavIcon>
            <NavText>Quản lý Camera</NavText>
          </NavItem>
          <NavItem eventKey="access-control">
            <NavIcon>
              <img src={accessLogo} alt="menu" style={{ width: '20px' }} />
            </NavIcon>
            <NavText>Quản lý vào ra</NavText>
          </NavItem>
          <NavItem eventKey="intercom">
            <NavIcon>
              <img src={starLogo} alt="menu" style={{ width: '20px' }} />
            </NavIcon>
            <NavText>Hệ thống intercom</NavText>
          </NavItem>
          <NavItem eventKey="fire">
            <NavIcon>
              <img src={fireLogo} alt="menu" style={{ width: '25px' }} />
            </NavIcon>
            <NavText>Hệ thống báo cháy</NavText>
          </NavItem>
          <NavItem eventKey="trafic">
            <NavIcon>
              <img src={homeLogo} alt="menu" style={{ width: '20px' }} />
            </NavIcon>
            <NavText>Hệ thống giao thông</NavText>
          </NavItem>
          <NavItem eventKey="bms">
            <NavIcon>
              <img src={bmsLogo} alt="menu" style={{ width: '25px' }} />
            </NavIcon>
            <NavText>Quản lý tòa nhà</NavText>
          </NavItem>
          <NavItem eventKey="parking">
            <NavIcon>
              {/* <FontAwesomeIcon icon={faChartLine} style={{ fontSize: '1.75em' }} /> */}
              <img src={parkingLogo} alt="menu" />
            </NavIcon>
            <NavText>Hệ thống Đỗ xe</NavText>
            <NavItem eventKey="parking/manager">
              <NavText>Quản lý</NavText>
            </NavItem>
            <NavItem eventKey="parking/report">
              <NavText>Báo cáo</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="environment">
            <NavIcon>
              <img src={environmentLogo} alt="menu" style={{ width: '25px' }} />
            </NavIcon>
            <NavText>Quan trắc môi trường</NavText>
          </NavItem>
          <NavItem eventKey="emergency">
            <NavIcon>
              <img src={emergencyLogo} alt="menu" style={{ width: '25px' }} />
            </NavIcon>
            <NavText>Quản lý cảnh báo</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </React.Fragment>
  );
}

MenuBar.propTypes = {};

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
    },
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
