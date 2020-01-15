import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import FlexItem from 'components/FlexItem';
import Logo from 'components/Logo';
const SMCHeader = styled.div`
  background-color: var(--main-bg-color);
  display: flex;
  height: 100px;
  align-items: center;
  margin-left: calc(var(--side-menu-width) * -1);
  padding: 0px 20px 0px 20px;
`
const UserIconImage = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    `;
const NavItem = styled(Link)`
  color: var(--main-text-color);
  text-decoration: none;
`
const SMCNavBar = styled.div`
  display: grid;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(7,minmax(50px, auto));
  grid-column-gap: 50px;
  font-size: 14px;
`
const UserIcon = styled(IconButton)`
  width:30px;
  height:30px;
  display: flex;
  align-items: center;
  background-color: white;
  &{
    padding: 0px !important;
    background-color: #fff !important;
  }
  & svg{
    font-size:16px;
  }
`
function Header({avatar}) {
  return (
    <SMCHeader id = "appHeader"> 
      <Logo></Logo> 
      <FlexItem></FlexItem>
      <SMCNavBar>
        <NavItem to="/">Công việc</NavItem>
        <NavItem to="/">Sự kiện</NavItem>
        <NavItem to="/">Sự cố</NavItem>
        <NavItem to="/">Thiết bị</NavItem>
        <NavItem to="/">Báo cáo</NavItem>
        <NavItem to="/">Quản trị</NavItem>
      </SMCNavBar>
      <UserIcon color="primary" aria-label="user info">
        <UserIconImage src={avatar} alt="icon"/>
      {/* <FontAwesomeIcon icon={faUser} style={{color:"var(--main-gray-color)"}}/> */}
      </UserIcon>
    </SMCHeader>
  );
}

export default Header;
