import { Link } from 'react-router-dom';
import VIChatRoom from './VIChatRoom';

export default function VisuallyImpaired() {
  return (
    <div className="App">
      <header className="App-header">
        <button>
          <Link to="/">Go Back</Link>
        </button>
        <h1>Visually Impaired</h1>
      </header>

      <section>
        <VIChatRoom />
      </section>
    </div>
  );
}
