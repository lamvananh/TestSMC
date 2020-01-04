import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon16 from 'components/Icon16';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { changeTab } from '../actions';
import reducer from '../reducer';
import { compose } from 'redux';
import { connect,useSelector, useDispatch} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import {makeSelectTabList} from '../selectors'
const key = 'tab-item';
const ItemTab = styled.div`
  position:relative;
  display: flex;
  flex : 1;
  max-width: 200px;
  min-width: 70px;
  background-color: #eaedef;
  height: 35px;
  font-size: 13px;
  padding: 5px 20px 5px 15px;
  color: var(--header-color-1);
  align-items: center;
  background-color: var(--tab-bar-background);
  &.selected::before{
    content:'';
    position: absolute;
    bottom: 0;
    left: -3px;
    z-index: 9999999;
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #ffffff;
  }
  &.selected{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color:#ffffff;
  }
  &.selected::after{
    content:'';
    position: absolute;
    bottom: 0;
    right: -3px;
    z-index: 9999999;
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #ffffff;
  }
`;
const CloseTabButton = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 4px;
  border-radius:50%;
  place-self: center;
  position: absolute;
  right: 8px;
  &:hover{
    background-color: #cbcbcc;
  }
`
const TabTitle = styled.div`
  flex:1;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 5px 0 0;
  text-overflow: ellipsis;
  &::after{
    content:'';
    width:100%;
    height:100%;    
    position:absolute;
    left:0;
    top:0;
    background:linear-gradient(transparent 150px, white);
  }
`;
export const TabItem = memo((props) => {
  useInjectReducer({ key, reducer });
  const memoItem = props.item;
  console.log("33333333333333333333",props.item.id, memoItem);
  return (
    <ItemTab className={"tab-item" + (memoItem.selected ? " selected" : "")}
      onClick={
        () => props.onChangeSelectedTab(memoItem)
      }>
      <Icon16 src={memoItem.iconSrc} alt="icon" />
      <TabTitle> {memoItem.name}</TabTitle>
      <CloseTabButton><FontAwesomeIcon icon={faTimes} /></CloseTabButton>
    </ItemTab>
  );
},shouldNotRerender);

function shouldNotRerender(prevProps, nextProps) {
  console.log("PPPPPPP", prevProps);
  return prevProps.item.selected == nextProps.item.selected;
}

TabItem.propTypes = {
  item: PropTypes.any,
  onChangeSelectedTab: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  tabs: makeSelectTabList()
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSelectedTab: item => {
      dispatch(changeTab(item))
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
)(TabItem);
