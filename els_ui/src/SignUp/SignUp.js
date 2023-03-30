import './SignUp.css';
import React from 'react';
import { SERVER_URL } from '../config'

const SignUpScreen = () => {
  const clicked = (event) => {
    event.preventDefault();

    // get elements values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const birth = document.getElementById('birth').value;
    
    // just printing
    console.log("Sending", username)
    console.log("Sending", password)
    console.log("Sending", email)
    console.log("Sending", birth)

    // clear the inputs
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('email').value = ""; // I don't think we need the email address.
    document.getElementById('birth').value = "";

    // send post to the server
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "username": username,"password":password, "birth":birth })
    };
      fetch(`${SERVER_URL}/sign_up`, requestOptions)
      .then(response => {
        if (response.status == 200){
          console.log("User created")
        }
        else {
          console.log("Something wrong")
        }
      })
  }
    return ( 
        <div className='main-div'>
      <div style={{width: "50%", display:"flex", display: "inline-block", float: "left"}}>
      <p className='els-header'>ELS</p>
      <h2 className='els-sentence'>Elderly Life Server</h2>
      <div className='img-div'></div>
      </div>
      <div className='partTwo' id='login-form'>
      <form className='tableSignUp'>
      <div style={{fontFamily: 'Trebuchet MS'}} className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" id="username" placeholder="Username" />
      </div>
      <div style={{fontFamily: 'Trebuchet MS'}} className="form-group">
        <label htmlFor="email">Email</label>
        <input type="Email" className="form-control" id="email" placeholder="Email" />
      </div>
      <div style={{fontFamily: 'Trebuchet MS'}} className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" placeholder="Password" />
      </div>
      <div style={{fontFamily: 'Trebuchet MS'}} className="form-group">
        <label htmlFor="birth">BirthDay</label>
        <input type="date" className="form-control" id="birth" placeholder="BirthDay" />
      </div>
      <button type="submit" onClick = {clicked} className="btn btn-primary" style={{marginBottom: "5%", fontFamily: 'Trebuchet MS', fontSize: '15px', textShadow: 'black'}}>Sign Up</button>
      <p className='notRegistered'>Back to <a href='#' style={{color: 'black'}}> Login</a></p>
      </form>
      </div>
    </div>
     );
};

export default SignUpScreen;