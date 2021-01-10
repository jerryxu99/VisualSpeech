import { Link } from 'react-router-dom';
import ChatRoom from './ChatRoom';

export default function AudioImpaired() {
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
