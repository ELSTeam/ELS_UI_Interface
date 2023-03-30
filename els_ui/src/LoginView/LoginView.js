import './LoginView.css';
import React from 'react';
import { SERVER_URL } from '../config'

const LoginScreen = () => {
  const clicked = (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // clear the input of the page
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    console.log("Sending ",username)
    console.log("Sending ",password)
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
          console.log("I'm in bro")
        }
        else {
          console.log("No no")
        }
      })
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
      <form className='tableSignIn'>
      <div style={{fontFamily: 'Trebuchet MS'}} className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" id="username" placeholder="Username" />
      </div>
      <div style={{fontFamily: 'Trebuchet MS'}} className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" placeholder="Password" />
      </div>
      <button onClick = {clicked} type="submit" className="btn btn-primary" style={{marginBottom: "5%", fontFamily: 'Trebuchet MS', fontSize: '15px', textShadow: 'black'}}>Log in</button>
      <p className='notRegistered'>Not Registered? <a href='#' style={{color: 'black'}}> Sign Up</a></p>
      </form>
      </div>
    </div> 
  );
};

export default LoginScreen;
