import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(23, 22, 22);
  z-index: 9999;
  opacity: 0.8;
`;

export default Backdrop;
