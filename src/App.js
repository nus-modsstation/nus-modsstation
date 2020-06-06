import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AppToolbar } from './components/AppToolbar/AppToolbar';
import { BottomNavbar } from './components/BottomNavbar/BottomNavbar';
import { StudyGroupPage } from './pages/study-group/StudyGroupPage';
import { VirtualGroupPage } from './pages/virtual-group/VirtualGroupPage';
import { QAThreadPage } from './pages/qa-thread/QAThreadPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { LoginPage } from './pages/login/LoginPage';

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './styles/material.styles';
import './App.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AppToolbar />
          <Switch>
            <Route path="/study-group">
              <StudyGroupPage />
            </Route>
            <Route path="/virtual-group">
              <VirtualGroupPage />
            </Route>
            <Route path="/qa-thread">
              <QAThreadPage />
            </Route>
            <Route path="/dashboard">
              <DashboardPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
          <BottomNavbar />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
