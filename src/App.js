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
import { QAThreadModulePage } from './pages/qa-thread/module/QAThreadModulePage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { LoginPage } from './pages/login/LoginPage';
import { TemplatePage } from './pages/template/TemplatePage';
import { VirtualGroupModulePage } from './pages/virtual-group/module/VirtualGroupModulePage';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './styles/material.styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// pick a date util library
import MomentUtils from '@date-io/moment';
import './App.css';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="App">
          <AppToolbar currentUser={currentUser} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/study-group" />}
            />
            <Route
              path="/study-group"
              render={() => <StudyGroupPage />}
            ></Route>
            <Route path="/virtual-group" component={VirtualGroupPage}></Route>
            <Route path="/qa-thread" component={QAThreadPage}></Route>
            <Route path="/dashboard" component={DashboardPage}></Route>
            <Route path="/template" component={TemplatePage}></Route>
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
            <Route path="/virtual-group-module">
              <VirtualGroupModulePage />     
            </Route>
            <Route path="/qa-thread-module">
              <QAThreadModulePage />
            </Route>
          </Switch>
          <BottomNavbar />
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
