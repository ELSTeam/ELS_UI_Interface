import './AboutUs.css';
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
    <div className="about-us">
      <h1>About Us</h1>
      <p>Dear colleagues,</p>
      <p>We are Omer Aplatony, Avital Aviv, and Avia Elgrably, a dedicated team working on our Sadna Projects Innovation, Industry & Research project.</p>
      <p>Our primary mission is to save human lives, with a special focus on the well-being of the elderly. We are committed to making a profound impact on the lives of those in need.</p>
      <p>Through our user-friendly UI interface, individuals can effortlessly create an account. This interface allows users to provide their essential contact information, including their phone number, which can be conveniently listed using our Telegram bot.</p>
      <p>Innovation is at the core of our work. We have developed a revolutionary FallDetector, a webcam-based solution that plays a crucial role in protecting and supporting the well-being of our users.</p>
      <p>Efficiency and timely assistance are paramount. To ensure this, we have implemented a smart notification system that promptly alerts relevant parties in the event of a fall. Our users can expect to receive notifications through various channels, including email, SMS, and live Telegram messages.</p>
      <p>With unwavering dedication, compassion, and a shared goal of saving human lives, we strive to create a safer and more secure future for the elderly.</p>    
      <p className="about-text">For more information about our project and to access the source code, please visit our <a href="https://github.com/ELSTeam" target="_blank" rel="noopener noreferrer">GitHub repository</a>.</p>
      <p>Thank you for your attention and support.</p>
      <p>Sincerely,</p>
      <p>ELS Team</p>
      <div className="footer">
        <p className="BackToLobbyFromHistory">
          Back to <a href="/lobby" style={{ color: 'black' }} onClick={handleLobbyClick}>Lobby</a>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
