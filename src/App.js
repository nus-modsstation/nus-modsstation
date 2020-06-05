import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { StudyGroupPage } from './pages/study-group/StudyGroupPage';
import { VirtualGroupPage } from './pages/virtual-group/VirtualGroupPage';
import { QAThreadPage } from './pages/qa-thread/QAThreadPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { AppToolbar } from './components/AppToolbar/AppToolbar';
import { BottomNavbar } from './components/BottomNavbar/BottomNavbar';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppToolbar />
        <Switch>
          <Route exact path="/">
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
        </Switch>
        <BottomNavbar />
      </div>
    </Router>
  );
};

export default App;
