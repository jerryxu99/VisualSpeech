import React from "react";
import "./App.css";
import AudioImpaired from "./components/AudioImpaired";
import VisuallyImpaired from "./components/VisuallyImpaired.js";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
    <div class="container">
      <Link to="/AudioImpaired">
      <div class="top">
          <h1>Audio Impaired</h1>
      </div>
      </Link>
      <Link to="/VisuallyImpaired">
      <div class="bottom">
          <h1>Visually Impaired</h1>
      </div>
      </Link>
    </div>
  );
}

export default App;
