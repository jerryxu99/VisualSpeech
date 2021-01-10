import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import VIChatRoom from './VIChatRoom';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

export default function VisuallyImpaired() {
  useEffect(() => {
    const doc = firestore.collection('audio').doc('buffer');
    console.log('hello world');

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        console.log(`Received new audio`);
        console.log(docSnapshot.data());
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      },
    );
  }, []);

  const updateBuffer = async () => {
    const audioRef = firestore.collection('audio').doc('buffer');

    await audioRef.set({
      buffer: 'world',
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button>
          <Link to="/">Go Back</Link>
        </button>
        <h1>Visually Impaired</h1>
        <button onClick={updateBuffer}>temp</button>
      </header>

      <section>
        <VIChatRoom />
      </section>
    </div>
  );
}
