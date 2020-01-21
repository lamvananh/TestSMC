/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import messages from './messages';
import { makeSelectTabList } from './selectors';
import reducer from './reducer';
import {addTab} from './actions';
import TabList from './tabList'
import tabLibrary from './tabCategory';
const key = 'tabs';

export function Tabs({
  tabs,onAddTab
}) {
  useInjectReducer({ key, reducer });

  useEffect(() => {
    if(tabs.length == 0){
      onAddTab( window.location.pathname);     
    }
  }, []);

  const tabListProps = {
    tabs
  };
  return (
    <React.Fragment>
      <TabList {...tabListProps}></TabList>
    </React.Fragment>

  );
}

Tabs.propTypes = {
  tabs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onLoadMockTab: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  tabs: makeSelectTabList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onAddTab : (item)=> dispatch(addTab(item))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Tabs);
