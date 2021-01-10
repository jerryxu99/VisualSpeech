import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
const fs = require('browserify-fs');
const util = require('util');

const firestore = firebase.firestore();

export default function VIChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    const doc = firestore.collection('audio').doc('buffer');

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        console.log(`Received new audio`);
        console.log(docSnapshot.data().buffer);
        const buffer = docSnapshot.data().buffer;
        const bufferOriginal = Buffer.from(buffer.data);
        console.log(bufferOriginal);
        createAudio(bufferOriginal);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      },
    );
  }, []);

  const createAudio = async (buffer) => {
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', buffer, 'binary');

    console.log('Audio content written to file: output.mp3');
    fs.readFile('./output.mp3', 'binary', (err, data) => {
      console.log(data);
    });
    const audio = new Audio('./output.mp3');
    audio.play();
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setFormValue('');
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
