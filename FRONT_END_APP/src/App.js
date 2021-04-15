import { useHistory } from 'react-router-dom';
import './App.css';
import LandingPage from './components/landingpage';

function App() {
const auth = null;
let history = useHistory();

  return (
    <div className="App">
      <LandingPage user={auth} hist={history}></LandingPage>
    </div>
  );
}

export default App;
