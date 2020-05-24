import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { HomePage } from './pages/home/HomePage';
import { StudyGroupPage } from './pages/study-group/StudyGroupPage';
import { VirtualGroupPage } from './pages/virtual-group/VirtualGroupPage';
import { QAThreadPage } from './pages/qa-thread/QAThreadPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <HomePage></HomePage>
        <nav>
          <ul>
            <li>
              <Link to="/study-group">Study Group</Link>
            </li>
            <li>
              <Link to="/virtual-group">Virtual Group</Link>
            </li>
            <li>
              <Link to="/qa-thread">Q & A Thread</Link>
            </li>
          </ul>
        </nav>
      </div>
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
      </Switch>
    </Router>
  );
};

export default App;
