import './SignUp.css';
import React, { useState } from 'react';
import LobbyPage from '../LobbyPage/LobbyPage';
import LoginView from '../LoginView/LoginView';
import { SERVER_URL } from '../config';

const SignUpScreen = () => {
  const [SignUp, setSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [BirthDay, setBirthDay] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [EmailError, setUserError] = useState('');
  const [dataError, setDataError] = useState('');

  if (SignUp) {
    return <LobbyPage username={username} password={password} Email={Email} BirthDay={BirthDay} />;
  }
  if (showLogin) {
    return <LoginView username={username} password={password} Email={Email} BirthDay={BirthDay}/>;
  }
  
  const handleSignUp = (event) => {
    event.preventDefault();
    if(password.length == 0 || username.length == 0 || BirthDay.length == 0 || Email.length == 0){
      setDataError('Please enter your data');
       return;
    }

    const user = {
      username: username,
      password: password,
      email: Email,
      birthDay: BirthDay
    };

    fetch(`${SERVER_URL}/sign_up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    if (response.ok) {
      console.log("succses to sign up");
      setSignUp(true);
    } else {
      throw new Error('Failed to sign up');
    }
  })
  .catch(error => {
    console.log(error);
    setDataError('Failed to sign up. Please try again later.');
  });

  };


  const handleLoginClick = (event) => {
    event.preventDefault();
    setShowLogin(true);
  };
 
  
    return ( 
        <div className='main-div'>
      <div style={{width: "50%", display:"flex", display: "inline-block", float: "left"}}>
      <p className='els-header-signUp'>ELS</p>
      <h2 className='els-sentence-signUp'>Elderly Life Server</h2>
      <div className='img-div-signUp'></div>
      </div>
      <div className='partTwo' id='login-form'>
      <form className='tableSignUp' onSubmit={handleSignUp}>
      <div style={{fontFamily: 'Trebuchet MS'}} className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" id="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}/>
      </div>
      <div style={{fontFamily: 'Trebuchet MS'}} className="form-group">
        <label htmlFor="email">Email</label>
        <input type="Email" className="form-control" id="email" placeholder="Email" value={Email} onChange={(event) => setEmail(event.target.value)}/>
        <div className="invalid-feedback" style={{color: 'red'}}>{EmailError}</div>
      </div>
      <div style={{fontFamily: 'Trebuchet MS'}} className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <div className="invalid-feedback" style={{color: 'red'}}>{passwordError}</div>
      </div>
      <div style={{fontFamily: 'Trebuchet MS'}} className="form-group">
        <label htmlFor="birth">BirthDay</label>
        <input type="date" className="form-control" id="birthdate" placeholder="BirthDay" value={BirthDay} onChange={(event) => setBirthDay(event.target.value)}/>
      </div>
      <div className="invalid-feedback" style={{color: 'red'}}>{dataError}</div>
      <button type="submit" className="button-signup" style={{marginBottom: "5%", fontFamily: 'Trebuchet MS', fontSize: '20px', textShadow: 'black'}}>Sign Up</button>
      <p className='notRegistered'>Back to <a href= "/login" style={{color: 'black', fontSize:'20px'}} onClick={handleLoginClick}> Login</a></p>
      </form>
      </div>
    </div>
     );
};

export default SignUpScreen;