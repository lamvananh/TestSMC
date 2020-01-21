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
import Map from 'containers/Map/Loadable';
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
import { useCookies } from 'react-cookie';

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
  const [cookies, setCookie] = useCookies(['token']);
  const layoutUnauthor = <Switch>
    <Route exact path="/login" component={LogIn} />
    <Route path="" component={LogIn} />
  </Switch>
  const layoutAuthenticated = <LayoutRow>
    <MenuBar></MenuBar>
    <LayoutColumn id="appContentContainer">
      <Header avatar="http://ace.jeka.by/assets/images/avatars/profile-pic.jpg" />
      <Tabs></Tabs>
      <AppWrapper>
        <Helmet
          titleTemplate="%s - Smart city"
          defaultTitle="Smart city"
        >
          <meta name="description" content="Smart city" />
        </Helmet>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/parking/manager" component={FeaturePage} />
          <Route path="/map" component={Map} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
        <FlexItem />
        {/* <Footer /> */}
      </AppWrapper>
    </LayoutColumn>
  </LayoutRow>
  return (
    <React.Fragment>
      {cookies.token ? layoutAuthenticated : layoutUnauthor}
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
