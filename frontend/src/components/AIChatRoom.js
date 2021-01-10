import { useState, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCl_pgIXTsrdIdOspvpZhIYRlZpsGElwz0',
  authDomain: 'speech-text-301223.firebaseapp.com',
  databaseURL: 'https://speech-text-301223-default-rtdb.firebaseio.com',
  projectId: 'speech-text-301223',
  storageBucket: 'speech-text-301223.appspot.com',
  messagingSenderId: '846497528771',
  appId: '1:846497528771:web:63192c2d0fb44468aedb76',
  measurementId: 'G-K8WKB4EZHC',
});

const firestore = firebase.firestore();

export default function AIChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('')

  const sendMessage = async(e) => {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setFormValue('');
  }

  return (
    <>
      <main>
        <div class="center">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </div>
      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={ (e) => setFormValue(e.target.value) }/>
        <button type="submit">Send</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const {text} = props.message;
  return (
  <>
  <img src="./avatar.jpg" />
  <p className="message">{text}</p>
  </>
  );
}
