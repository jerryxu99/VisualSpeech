import React from 'react';
import './App.css';
import AudioImpaired from './components/AudioImpaired';
import VisuallyImpaired from './components/VisuallyImpaired.js';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
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
    <div>
      <button>
        <Link to="/AudioImpaired">Audio Impaired</Link>
      </button>
      <button>
        <Link to="/VisuallyImpaired">Visually Impaired</Link>
      </button>
    </div>
  );
}

export default App;
