/**
 *
 * Icon16.js
 *
 * Renders an image with size is 16px;
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import FullScreenBlock from '../FullScreenBlock';
import Backdrop from "../../components/Backdrop"


const BlockContainer = styled.div`
  border-radius:10px;
  padding: 10px 20px;
  border-radius: 10px;
  border: solid 1px #d9d6d6;
  box-shadow: 1px 1px 4px #d9d6d6;
  position:relative;
  height: ${props => props.height}
`
const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];
const ButtonShowMenu = styled(IconButton)`
  position: absolute !important;
  padding: 5px !important;
  right: 5px;
    top: 5px;
`
const ButtonFullScreen = styled(IconButton)`
  position: absolute !important;
  padding: 5px !important;
  right: 35px;
  top: 5px;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  min-height: 30px;
`;
const Title = styled.div`
  text-transform: uppercase;
  font-size: 20px;
  color:  var(--main-text-dark-color);
  font-weight: 600;
`
const Description = styled.div`
  font-size: 18px;
  color:  var(--main-gray-color);
  margin-left:20px;
`
const ITEM_HEIGHT = 48;

function Block({ title, description, countNumber, mainComponent, fullScreenComponent, menuConfig }) {
  const [isFullScreen, setIsFullScreen] = useState("");
  let content = mainComponent;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
const changePopupState = state =>{
  setIsFullScreen(state);
}
  const handleClose = () => {
    setAnchorEl(null);
  };
   const FullScreenDiv = isFullScreen ?<div> <Backdrop></Backdrop>
    <FullScreenBlock callBackFunction = {changePopupState} isShow={true} title={title} description={description} mainComponent={mainComponent}></FullScreenBlock> 
    </div>: null;
  console.log("isFullScreen......", isFullScreen);
  return <BlockContainer>
    {FullScreenDiv}
      <Header>
        <Title>{title}</Title>
        <Description>{description + (countNumber ? ": " + countNumber : "")}</Description>
        <ButtonFullScreen onClick={() => { setIsFullScreen(true) }}>
          <ZoomInIcon />
        </ButtonFullScreen>
        <ButtonShowMenu
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </ButtonShowMenu>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {menuConfig.items.map(item => {
            return <MenuItem key={item.id} onClick={(e) => { menuConfig.onClick(item.id) }}>{item.title}</MenuItem>
          })}
        </Menu>
      </Header>
      {content}
    </BlockContainer>;
}

// We require the use of src and alt, only enforced by react in dev mode
Block.propTypes = {
  title: PropTypes.string
  , description: PropTypes.string
  , countNumber: PropTypes.string
  , mainComponent: PropTypes.any
  , fullScreenComponent: PropTypes.elementType
  , menuConfig: PropTypes.object.isRequired
};

export default Block;
