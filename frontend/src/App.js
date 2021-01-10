import React, {useState, useRef} from 'react';
import './App.css';

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
    <div className="App">
      <header className="App-header">
        <h1>Let's chat!</h1>
        <SignOut />
      </header>

      <section>
      <ChatRoom /> 
      </section>
    </div>
  );
}

function SignOut(){
  return (
    <>
      <button>Sign Out</button>
    </>
  )
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

export default App;