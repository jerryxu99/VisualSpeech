import { Link } from 'react-router-dom';
import AIChatRoom from './AIChatRoom';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

export default function AudioImpaired() {
  const updateBuffer = async () => {
    const audioRef = firestore.collection('audio').doc('buffer');

    await audioRef.set({
      buffer: 'world2',
    });
    console.log('updated');
  };
  return (
    <div className="App">
      <header className="App-header">
        <button>
          <Link to="/">Go Back</Link>
        </button>
        <h1>Audio Impaired</h1>
        <button onClick={updateBuffer}></button>
      </header>

      <section>
        <AIChatRoom />
      </section>
    </div>
  );
}
