import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ListTab(props) {
const ComponentToRender = props.component;
  let content = <div />;
const ListTab = styled.div`
  display: flex;
  background-color: var(--tab-bar-background);
  position:sticky;
  top:0;
  border-bottom: 5px solid #FFF;
  padding: 0 0 0 70px;
  z-index:9;
`;
  // If we have items, render them
  if (props.items) {
    content = props.items.map(item => (
      <ComponentToRender key={`item-${item.id}`} item={item} />
    ));
  }
  return (
      <ListTab>{content}</ListTab>
  );
}

ListTab.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array,
};

function isNotNeedRender(prevProp, nexrProp){

}
export default ListTab;
