import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  return (
    <>
    <div className="App">
    <h1>Welcome to the SOTTOS project</h1>
    <div className="container">
     
      <div className="box">
        <h2>Speak Here</h2>
        <button>Save Text</button>
        <button>Start/ Stop</button>
      </div>

      <div className="box">
        <h2>Output</h2>
        <button>Save Text</button>
        <button>Start/ Stop</button>
      </div>

    </div>
    </div>
    </>
  );
}

export default App;
