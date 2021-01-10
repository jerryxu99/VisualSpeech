import React, {useState, useRef} from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCl_pgIXTsrdIdOspvpZhIYRlZpsGElwz0",
    authDomain: "speech-text-301223.firebaseapp.com",
    databaseURL: "https://speech-text-301223-default-rtdb.firebaseio.com",
    projectId: "speech-text-301223",
    storageBucket: "speech-text-301223.appspot.com",
    messagingSenderId: "846497528771",
    appId: "1:846497528771:web:63192c2d0fb44468aedb76",
    measurementId: "G-K8WKB4EZHC"
})


const firestore = firebase.firestore();

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

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: "id"});
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();


    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setFormValue('');
    dummy.current.scrollIntoView({behavior: 'smooth'});
  }

  return(
  <>
      <main>
        {messages && messages.map( msg => <ChatMessage key={msg.id} message={msg}/>)}
        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={ (e) => setFormValue(e.target.value)} />
        <button type="submit">Send</button>
      </form>
  </>
  );
};

function ChatMessage(props){
  return(
        <p>{props.message}</p>
  );
};

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
    <div className="App">
      <header className="App-header">
        <button>
           <Link to="/">Go Back</Link>
        </button>
        <h1>Audio Impaired</h1>

      </header>

      <section>
      <ChatRoom />
      </section>
    </div>
  );
}

function VisuallyImpaired() {
  return (
    <div className="App">
      <header className="App-header">
         <button>
           <Link to="/">Go Back</Link>
         </button>
        <h1>Visually Impaired</h1>

      </header>

      <section>
      <ChatRoom />
      </section>
    </div>
  );
}


export default App;
