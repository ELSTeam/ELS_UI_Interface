import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LobbyPage from './LobbyPage/LobbyPage';
import LoginView from './LoginView/LoginView';
import MyContacts from './MyContacts/MyContacts';
import reportWebVitals from './reportWebVitals';
import SignUpScreen from './SignUp/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LobbyPage/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();