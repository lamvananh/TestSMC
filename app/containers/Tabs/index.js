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
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import messages from './messages';
import { addTabs } from '../App/actions';
import { makeSelectTabList } from './selectors';
import reducer from './reducer';
import TabList from './tabList'
const key = 'tabs';

export function Tabs({
  tabs,
  onLoadMockTab
}) {
  useInjectReducer({ key, reducer });

  useEffect(() => {
    // load 3 mock tab to screen
    //  onLoadMockTab();
  }, []);

  const tabListProps = {
    tabs
  };

  return (
        <TabList {...tabListProps}></TabList>
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
