import styled from 'styled-components';
import Section from './Section';

const CenteredSection = styled(Section)`
  text-align: center;
`;

const CenteredFlex = styled(Section)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
`;

export  {CenteredSection,CenteredFlex};
