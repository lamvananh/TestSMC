import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon16 from 'components/Icon16';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { compose } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { Link, Redirect } from 'react-router-dom';
import { makeSelectTabList } from '../selectors';
import reducer from '../reducer';
import { changeTab, removeTab } from '../actions';
const key = 'tab-item';
const ItemTab = styled(Link)`
  position: relative;
  display: flex;
  flex: 1;
  max-width: 200px;
  min-width: 70px;
  background-color: #eaedef;
  height: 40px;
  font-size: 14px;
  padding: 10px 20px 5px 15px;
  color: var(--main-text-light-color);
  align-items: center;
  background-color: var(--main-bg-color);
  text-decoration: none;
  transition: 0.2s;
  &:hover {
    background-color: var(--tab-bar-background-hover);
    border-top-left-radius: var(--tar-border-radius);
    border-top-right-radius: var(--tar-border-radius);
    color: var(--main-text-dark-color);
  }
  &.selected {
    border-top-left-radius: var(--tar-border-radius);
    border-top-right-radius: var(--tar-border-radius);
    background-color: #ffffff;
    transform-style: preserve-3d;
    color: var(--main-text-dark-color);
  }
`;
const CloseTabButton = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:50%;
  place-self: center;
  position: absolute;
  right: 8px;
  &:hover{
    background-color: #cbcbcc8a;
  }
  &:hover svg{
    color: color : var(--main-text-dark-color);
  }
  $ svg{
    color: color : var(--main-text-light-color);
  }
`;
const TabTitle = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 5px 0 0;
  text-overflow: ellipsis;
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(transparent 150px, white);
  }
`;
export function TabItem(props) {
  useInjectReducer({ key, reducer });
  const memoItem = props.item;
  console.log('TabItem..........', memoItem.selected);
  return (
    <React.Fragment>
      <ItemTab
        className={`tab-item${memoItem.selected ? ' selected' : ''}`}
        to={memoItem.url}
        onClick={() => {
          props.onChangeSelectedTab(memoItem);
        }}
      >
        <Icon16 src={memoItem.iconSrc} alt="icon" />
        <TabTitle> {memoItem.name}</TabTitle>
        <CloseTabButton
          onClick={event => {
            props.onRemoveTab(event, memoItem);
          }}
        >
          <svg
            style={{ width: '13px', height: '13px' }}
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="times"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="svg-inline--fa fa-times fa-w-10 fa-2x"
          >
            <path
              fill="currentColor"
              d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
            />
          </svg>
        </CloseTabButton>
      </ItemTab>
      {// redirect vể url tương ứng khi chỉ định tab được chọn
        memoItem.selected && window.location.pathname != memoItem.url ? (
          <Redirect to={memoItem.url} />
        ) : null}
    </React.Fragment>
  );
}

function shouldNotRerender(prevProps, nextProps) {
  console.log('PPPPPPP', prevProps);
  return false;
}
TabItem.propTypes = {
  item: PropTypes.any,
  onChangeSelectedTab: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  tabs: makeSelectTabList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSelectedTab: item => {
      console.log('tabItem click..........');
      dispatch(changeTab(item));
    },
    onRemoveTab: (event, item) => {
      console.log('tabItem children click..........', event);
      dispatch(removeTab(item));
      event.stopPropagation();
      event.preventDefault();
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(memo(TabItem, shouldNotRerender));
