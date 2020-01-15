/**
 *
 * FlexItem.js
 *
 * Renders an div auto span width;
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SMCFlexItem = styled.div`
  display: flex;
  flex:1;
`;
function FlexItem(props) {
  return <SMCFlexItem  />;
}

// We require the use of src and alt, only enforced by react in dev mode
FlexItem.propTypes = {

};

export default FlexItem;
