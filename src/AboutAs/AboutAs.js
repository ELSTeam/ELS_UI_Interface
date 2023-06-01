import './AboutAs.css';
import React from 'react';
import {useState} from 'react';
import LobbyPage from '../LobbyPage/LobbyPage';

const AboutUs = (props) => {
    const [ShowLobby, setShowLobby] = useState(false);
    const handleLobbyClick = (event) => {
        event.preventDefault();
        setShowLobby(true);
    };

    if (ShowLobby) {
        return <LobbyPage username={props.username} password={props.password} BirthDay={props.BirthDay} Email={props.Email}/>;
    }
    
  return (
    <div className='main-div' style={{height:'100vh'}}>
      <div className='logo-img-about-as' style={{width:'200px', height:'180px',borderRadius:'16px', marginBottom:'0%'}}>
            </div>
    <div className="about-us">
      <h1>About Us</h1>
      <div className='main-div-about-as'>
      <p>We are Omer Aplatony, Avital Aviv, and Aviya Elgrably, a dedicated team working on our Sadna Projects Innovation, Industry & Research project.</p>
      <p>Our primary mission is to save human lives, with a special focus on the well-being of the elderly. We are committed to making a profound impact on the lives of those in need.</p>
      <p>Through our user-friendly UI interface, individuals can effortlessly create an account. This interface allows users to provide their essential contact information, including their phone number, which can be conveniently listed using our Telegram bot.</p>
      <p>Innovation is at the core of our work. We have developed a revolutionary FallDetector, a webcam-based solution that plays a crucial role in protecting and supporting the well-being of our users.</p>
      <p>Efficiency and timely assistance are paramount. We have implemented a smart notification system that promptly alerts relevant parties in the event of a fall. Our users can expect to receive notifications through email, SMS, and Telegram messages.</p>
      <p className="about-text">For more information about our project, please visit our <a href="https://github.com/ELSTeam" target="_blank" rel="noopener noreferrer" style={{color:'black'}}>GitHub repository</a>.</p>
      <p className='LAST-P'><strong>Thank you for your attention! ELS Team</strong></p>
      </div>
      <div className="footer">
        <strong className="BackToLobbyFromAbout"  style={{fontSize:'150%', marginLeft:'87%', color:'black', marginBottom:'1%'}}>
          Back to <a href="/lobby" onClick={handleLobbyClick} style={{color:'black'}}>Lobby</a>
        </strong>
      </div>
    </div>
    
</div>
  );
};

export default AboutUs;