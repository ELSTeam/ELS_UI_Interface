import './LoginView.css';
import React from 'react';

const LoginScreen = () => {
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
      <button type="submit" className="btn btn-primary" style={{marginBottom: "5%", fontFamily: 'Trebuchet MS', fontSize: '15px', textShadow: 'black'}}>Log in</button>
      <p className='notRegistered'>Not Registered? <a href='#' style={{color: 'black'}}> Sign Up</a></p>
      </form>
      </div>
    </div> 
  );
};

export default LoginScreen;
