import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import axios from 'axios';
const fs = require('browserify-fs');
const util = require('util');

const firestore = firebase.firestore();

export default function VIChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', playAudio);

    const doc = firestore.collection('audio').doc('buffer');

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        console.log(`Received new audio`);
        console.log(docSnapshot.data().buffer);
        const buffer = docSnapshot.data().buffer;
        const bufferOriginal = Buffer.from(buffer.data);
        console.log(bufferOriginal);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      },
    );
  }, []);

  const playAudio = () => {
    console.log('playing audio');
    fs.readFile('./output.mp3', (err, data) => {
      console.log('data:');
      console.log(data);
    });

    const audio = new Audio('http://localhost:5000/audio.mp3');
    console.log(audio.src);
    audio.play();
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setFormValue('');
    updateText();
  };

  const updateText = () => {
    axios
      .get('http://localhost:5000/speechToText')
      .then(async (res) => {
        console.log(res.data.text);

        const messagesRef = firestore.collection('messages');
        await messagesRef.add({
          text: res.data.text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <main>
        <div class="center">
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </div>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text } = props.message;
  return <p>{text}</p>;
}
