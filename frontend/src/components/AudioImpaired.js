import { Link } from 'react-router-dom';
import AIChatRoom from './AIChatRoom';

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
        <AIChatRoom />
      </section>
    </div>
  );
}
