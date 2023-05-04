import logo from './logo.svg';
import './App.css';
import SignUpScreen from './SignUp/SignUp';
import LoginView from './LoginView/LoginView';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LobbyPage from './LobbyPage/LobbyPage';
import MyContacts from './MyContacts/MyContacts';
import MyHistory from './MyHistory/MyHistory';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edittttttt <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Router>
      <Switch>
        <Route path="/signup" component={SignUpScreen} />
        <Route path="/login" component={LoginView} />
        <Route path="/lobby" component={LobbyPage} />
        <Route path="/myContact" component={MyContacts} />
        <Route path="/myHistory" component={MyHistory} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
