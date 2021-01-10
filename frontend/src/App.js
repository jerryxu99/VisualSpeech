import React from 'react';
import './App.css';
import AudioImpaired from './components/AudioImpaired';
import VisuallyImpaired from './components/VisuallyImpaired.js';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/AudioImpaired">
          <AudioImpaired />
        </Route>
        <Route path="/VisuallyImpaired">
          <VisuallyImpaired />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return (
      <div id="container">
      <Link to="/AudioImpaired">
        <div class="split top">
          <div class="centered">Audio Impaired</div>
        </div>
      </Link>
      <Link to="/VisuallyImpaired">
        <div class="split bottom">
          <div class="centered">Visually Impaired</div>
        </div>
      </Link>
      </div>
  );
}

export default App;
