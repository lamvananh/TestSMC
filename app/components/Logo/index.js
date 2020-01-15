/**
 *
 * Icon16.js
 *
 * Renders an image with size is 16px;
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LogoImg = styled.img`
  height: 50px;
`
function Logo(props) {
  return <LogoImg src="../images/logo.png" />;
}

// We require the use of src and alt, only enforced by react in dev mode
Logo.propTypes = {

};

export default Logo;
