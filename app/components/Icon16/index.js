/**
 *
 * Icon16.js
 *
 * Renders an image with size is 16px;
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img16 = styled.img`
  width:16px;
  height:16px;
  margin-right:7px;
`;
function Icon16(props) {
  return <Img16 src={props.src} />;
}

// We require the use of src and alt, only enforced by react in dev mode
Icon16.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  alt: PropTypes.string.isRequired,
};

export default Icon16;
