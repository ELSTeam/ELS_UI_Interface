import './LoginView.css';
import React, { useState } from 'react';
import LobbyPage from '../LobbyPage/LobbyPage'
import SignUpScreen from '../SignUp/SignUp';
import { SERVER_URL } from '../config'

const LoginScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ShowSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userError, setUserError] = useState('');


  const handleLogin = (event) => {
    event.preventDefault();
    event.preventDefault();
    const username_input = document.getElementById('username').value;
    const password_input = document.getElementById('password').value;

    // clear the input of the page
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    console.log("Sending ",username_input)
    console.log("Sending ",password_input)
    let return_status = null
    // send login to server
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "username": username,"password":password })
    };
      fetch(`${SERVER_URL}/sign_in`, requestOptions)
      .then(response => {
        if (response.status == 200){
          setUsername(username);
          console.log("Logged in as: ",username)
          setLoggedIn(true);
        }
        else {
          console.log("No no")
        }
      })    
  };

  const handleSignUpClick = (event) => {
    event.preventDefault();
    setShowSignUp(true);
  };

  if (loggedIn) {
    return <LobbyPage Username={username}/>;
  }
  if(ShowSignUp){
    return <SignUpScreen/>;
  }

  return (
    <div className='main-div'>
      <div style={{width: "50%", display:"flex", display: "inline-block", float: "left"}}>
      <p className='els-header'>ELS</p>
      <h2 className='els-sentence'>Elderly Life Server</h2>
      <div className='img-div' style={{borderRadius:'15px', marginLeft:'21%', paddingLeft:'0%',imageResolution:'from-image'}}></div>
      </div>
      <div className='partTwo' id='login-form'>
      <div className='welcome'> welcome !</div>
      <form className='tableSignIn' onSubmit={handleLogin}>
      <div style={{fontFamily: 'Trebuchet MS'}} className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" id="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
        <div className="invalid-feedback" style={{color: 'red'}}>{userError}</div>
      </div>
      <div style={{fontFamily: 'Trebuchet MS'}} className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <div className="invalid-feedback" style={{color: 'red'}}>{passwordError}</div>
      </div>
      <button type="submit" className="btn btn-primary" style={{marginBottom: "5%", fontFamily: 'Trebuchet MS', fontSize: '15px', textShadow: 'black'}}>Log in</button>
      <p className='notRegistered'>Not Registered? <a href="/signup" style={{color: 'black'}} onClick={handleSignUpClick}> Sign Up</a></p>
      </form>
      </div>
    </div> 
  );
};

export default LoginScreen;
