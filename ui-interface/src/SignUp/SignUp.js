import './SignUp.css';
import React from 'react';

const SignUpScreen = () => {
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
      <button type="submit" className="btn btn-primary" style={{marginBottom: "5%", fontFamily: 'Trebuchet MS', fontSize: '15px', textShadow: 'black'}}>Sign Up</button>
      <p className='notRegistered'>Back to <a href='#' style={{color: 'black'}}> Login</a></p>
      </form>
      </div>
    </div>
     );
};

export default SignUpScreen;