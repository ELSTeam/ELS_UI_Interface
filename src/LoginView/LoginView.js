import './LoginView.css';
import React from 'react';

const LoginScreen = () => {
  return (
    <div className='main-div'>
    <div style={{width: "50%", display:"flex", display: "inline-block", float: "left"}}>
    <p className='els-header'>ELS</p>
    <h2 className='els-sentence'>Eldry Life Server</h2>
    <div className='img-div'></div>
    </div>
    <div className='partTwo' id='login-form'>
    <form>
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input type="text" className="form-control" id="username" placeholder="Username" />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" className="form-control" id="password" placeholder="Password" />
    </div>
    <button type="submit" className="btn btn-primary" style={{marginBottom: "5%"}}>Log in</button>
    Not Registered? <a href='#'> Sign Up</a>
  </form>
      
    </div>
    </div>
  );
};

export default LoginScreen;
