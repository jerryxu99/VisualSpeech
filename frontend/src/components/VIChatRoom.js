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
  });

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

  const sendMessage = () => {
    console.log('updating text');
    axios
      .get('http://localhost:5000/speechToText')
      .then(async (res) => {
        console.log('sending messsage');
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
      <div className="container">
        <main className="top" id="top-chat">
          <div class="center">
            {messages &&
              messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          </div>
        </main>

        <div className="bottom" id="bottom-chat">
          <button id="mic-btn" onClick={sendMessage}>
            <img
              id="mic-img"
              src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjU2IiB4Mj0iMjU2IiB5MT0iNTA0LjMyNiIgeTI9Ii03LjM4OCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNTU1OGZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBjMGZmIi8+PC9saW5lYXJHcmFkaWVudD48ZyBmaWxsPSJ1cmwoI1NWR0lEXzFfKSI+PHBhdGggZD0ibTEwNiAyNzJjLTguMjg0IDAtMTUgNi43MTYtMTUgMTUgMCA4NS45MjUgNjYuMDIzIDE1Ni43MDcgMTUwIDE2NC4zMTF2MzAuNjg5aC03NWMtOC4yODQgMC0xNSA2LjcxNi0xNSAxNXM2LjcxNiAxNSAxNSAxNWgxODBjOC4yODQgMCAxNS02LjcxNiAxNS0xNXMtNi43MTYtMTUtMTUtMTVoLTc1di0zMC42ODljODMuOTc3LTcuNjA0IDE1MC03OC4zODYgMTUwLTE2NC4zMTEgMC04LjI4NC02LjcxNi0xNS0xNS0xNXMtMTUgNi43MTYtMTUgMTVjMCA3NC40MzktNjAuNTYxIDEzNS0xMzUgMTM1cy0xMzUtNjAuNTYxLTEzNS0xMzVjMC04LjI4NC02LjcxNi0xNS0xNS0xNXoiLz48cGF0aCBkPSJtMjU2IDM5MmM1Ny44OTcgMCAxMDUtNDcuMTAzIDEwNS0xMDV2LTE4MmMwLTU3Ljg5Ny00Ny4xMDMtMTA1LTEwNS0xMDVzLTEwNSA0Ny4xMDMtMTA1IDEwNXYxODJjMCA1Ny44OTcgNDcuMTAzIDEwNSAxMDUgMTA1em0tNzUtMjg3YzAtNDEuMzU1IDMzLjY0NS03NSA3NS03NXM3NSAzMy42NDUgNzUgNzV2MTgyYzAgNDEuMzU1LTMzLjY0NSA3NS03NSA3NXMtNzUtMzMuNjQ1LTc1LTc1eiIvPjwvZz48L3N2Zz4="
            />
          </button>
        </div>
      </div>
    </>
  );
}

function ChatMessage(props) {
  const { text } = props.message;
  return (
    <>
      <div className="">
        
        <p className="message">
        {text} <img id="profile-pic" src="images/avatar.jpg"/> 
        </p>
        
      </div>
    </>
  );
}
