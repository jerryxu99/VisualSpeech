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
