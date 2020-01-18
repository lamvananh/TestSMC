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
import CloseIcon from '@material-ui/icons/Close';

const FullScreenBlockContainer = styled.div`
  border-radius: 10px;
  padding: 20px 50px;
  border-radius: 10px;
  border: solid 1px #545050;
  box-shadow: 1px 1px 1px #545050;
  position: fixed;
  height: 90%;
  width: 90%;
  top: 5%;
  left: 5%;
  z-index: 9999;
  background-color: var(--main-text-light-color);
  & .scm-grid {
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    margin-top: 15px;
  }
  & .scm-grid .scm-grid-item {
    padding: 10px;
    border: 1px solid var(--main-gray-color);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  min-height: 30px;
`;
const Title = styled.div`
  text-transform: uppercase;
  font-size: 20px;
  color: var(--main-text-dark-color);
  font-weight: 600;
`;
const Description = styled.div`
  font-size: 18px;
  color: var(--main-gray-color);
  margin-left: 20px;
`;
const ButtonClose = styled(IconButton)`
  position: absolute !important;
  padding: 5px !important;
  right: 5px;
  top: 5px;
`;
function FullScreenBlock({
  title,
  description,
  countNumber,
  mainComponent,
  callBackFunction,
}) {
  const [isFullScreen, setIsFullScreen] = useState(true);
  const content = mainComponent;
  return (
    <FullScreenBlockContainer>
      <Header>
        <Title>{title}</Title>
        <Description>
          {description + (countNumber ? `: ${countNumber}` : '')}
        </Description>
        <ButtonClose onClick={() => callBackFunction(false)}>
          <CloseIcon />
        </ButtonClose>
      </Header>
      {content}
    </FullScreenBlockContainer>
  );
}

// We require the use of src and alt, only enforced by react in dev mode
FullScreenBlock.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  countNumber: PropTypes.string,
  mainComponent: PropTypes.any,
  callBackFunction: PropTypes.func,
};

export default FullScreenBlock;
