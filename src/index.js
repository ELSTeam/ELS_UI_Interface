import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LobbyPage from './LobbyPage/LobbyPage';
import LoginView from './LoginView/LoginView';
import MyContacts from './MyContacts/MyContacts';
import reportWebVitals from './reportWebVitals';
import SignUpScreen from './SignUp/SignUp';
import MyHistory from './MyHistory/MyHistory'
import MyAccount from './MyAccount/MyAccount';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyAccount/>
  </React.StrictMode>
);
reportWebVitals();