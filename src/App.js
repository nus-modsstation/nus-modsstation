import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.action';

import { AppToolbar } from './components/AppToolbar/AppToolbar';
import { BottomNavbar } from './components/BottomNavbar/BottomNavbar';
import { StudyGroupPage } from './pages/study-group/StudyGroupPage';
import { VirtualGroupPage } from './pages/virtual-group/VirtualGroupPage';
import { QAThreadPage } from './pages/qa-thread/QAThreadPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { LoginPage } from './pages/login/LoginPage';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './styles/material.styles';
import './App.css';

const AppComponent = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AppToolbar currentUser={currentUser} />
        <Switch>
          <Route
            exact
            path={['/', '/study-group']}
            component={StudyGroupPage}
          ></Route>
          <Route path="/virtual-group" component={VirtualGroupPage}></Route>
          <Route path="/qa-thread" component={QAThreadPage}></Route>
          <Route path="/dashboard" component={DashboardPage}></Route>
          <Route
            path="/login"
            render={() =>
              currentUser ? <Redirect to="/study-group" /> : <LoginPage />
            }
          />
          <Route
            path="/register"
            render={() =>
              currentUser ? <Redirect to="/study-group" /> : <LoginPage />
            }
          />
        </Switch>
        <BottomNavbar />
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
