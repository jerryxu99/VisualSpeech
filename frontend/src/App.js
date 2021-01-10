import "./App.css";
import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// function App() {
//   return (
//     <>
//     <div className="App">
//     <h1>Welcome to the SOTTOS project</h1>
//     <div className="container">
//
//       <div className="box">
//         <h2>Speak Here</h2>
//         <button>Save Text</button>
//         <button>Start/ Stop</button>
//       </div>
//
//       <div className="box">
//         <h2>Output</h2>
//         <button>Save Text</button>
//         <button>Start/ Stop</button>
//       </div>
//
//     </div>
//     </div>
//     </>
//   );
// }
//
// export default App;

export default function ExamplePages() {
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

// Separate Pages

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

function AudioImpaired() {
  return (
    <div>
      <h2>Audio Impaired</h2>
      <button>
        <Link to="/">Go Back</Link>
      </button>
    </div>
  );
}

function VisuallyImpaired() {
  return (
    <div>
      <h2>Visually Impaired</h2>
      <button>
        <Link to="/">Go Back</Link>
      </button>
    </div>
  );
}
