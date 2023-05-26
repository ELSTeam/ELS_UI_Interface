import './MyHistory.css';
import React, { useEffect, useState } from 'react';
import LobbyPage from '../LobbyPage/LobbyPage';
import { SERVER_URL } from '../config'


const MyHistory = (props) => {
  const [ShowLobby, setShowLobby] = useState(false);
  const [fallHistory, setFallHistory] = useState([]);

  const username = props.username
  useEffect(() => {
    get_falls_history();
  }, []);
  
  const get_falls_history = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username }),
    };
    fetch(`${SERVER_URL}/all_history`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log('No no');
        }
      })
      .then((data) => {
        setFallHistory(data);
        console.log(data)
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };
  
  
  
  if (ShowLobby) {
    return <LobbyPage username={props.username} password={props.password} BirthDay={props.BirthDay} Email={props.Email}/>;
  }
  

  const handleLobbyClick = (event) => {
    event.preventDefault();
    setShowLobby(true);
  };

return (
  <div className="main-div">
      <div>
        <div className="myContacts-header">My History</div>
        <div
          className="logo-img"
          style={{ width: '120px', height: '120px', marginTop: '-100px', borderRadius: '16px' }}
        ></div>
      </div>
      <table className="table table-hover myTable-history" style={{ alignContent: 'center', hover: '20' }}>
        <thead>
          <tr className="firstRow">
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {fallHistory.map((fall, index) => (
            <tr className="rows" key={index}>
              <th scope="row">{index + 1}</th>
              <td>{fall.date}</td>
              <td>{fall.date.split(' ')[1]}</td>
              <td><a href={fall.video_url}target='_blank'>Watch Video</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="footer">
        <p className="BackToLobbyFromHistory">
          Back to <a href="/lobby" style={{ color: 'black' }} onClick={handleLobbyClick}>Lobby</a>
        </p>
      </div>
    </div>
);
};

export default MyHistory;