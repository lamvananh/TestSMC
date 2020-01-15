/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import reducer from 'reducer';
import { useInjectReducer } from 'utils/injectReducer';
import HomePage from 'containers/HomePage/Loadable';
import LogIn from 'containers/LogIn/Loadable';
import Tabs from 'containers/Tabs/Loadable';
import MenuBar from 'containers/MenuBar/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import FlexItem from 'components/FlexItem';
import { makeSelectCurrentUser } from '../Login/selectors'
import GlobalStyle from '../../global-styles';
import '../../styles.css';

const key = "root-app"
const AppWrapper = styled.div`
  display: flex;
  padding: 20px 16px;
  flex-direction: column;
  flex:1;

`;
const LayoutRow = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: row;
  flex: 1;
`;

const LayoutColumn = styled.div`
  margin: 0 auto;
  display: flex;
  flex: 1;
  min-height: 100%;
  flex-direction: column;
  margin-left: 64px;
  background-color: #fff;
`;

export function App({ currentUser }) {
  useInjectReducer({ key, reducer });
  console.log("currentUser.token........", currentUser.token);
  const layoutUnauthor = <Switch>
    <Route exact path="/login" component={LogIn} />
    <Route path="" component={LogIn} />
  </Switch>
  const layoutAuthenticated = <LayoutRow>
    <MenuBar></MenuBar>
    <LayoutColumn id="appContentContainer">
      <Header />
      <Tabs></Tabs>
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/parking/manager" component={FeaturePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
        <FlexItem />
        <Footer />
      </AppWrapper>
    </LayoutColumn>
  </LayoutRow>
  return (
    <React.Fragment>
      {currentUser.token ? layoutAuthenticated  : layoutUnauthor}
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps
);

export default compose(
  withConnect,
  memo,
)(App);
