import './MyHistory.css';
import React, { useEffect, useState } from 'react';
import LobbyPage from '../LobbyPage/LobbyPage';
import { SERVER_URL } from '../config';



const MyHistory = (props) => {
  const [ShowLobby, setShowLobby] = useState(false);
  const [fallHistory, setFallHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const username = props.username
  useEffect(() => {
    get_falls_history();
  }, []);
  
  const get_falls_history = () => {
    setIsLoading(true); // Set loading status to true
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
        setIsLoading(false); // Set loading status to false after data is fetched
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
        <div className="myContacts-header" style={{fontSize:'500%', fontWeight:'bold', paddingTop:'4%'}}>My History</div>
        <div
          className="logo-img"
          style={{width:'200px', height:'200px',borderRadius:'16px', marginTop:'-10%'}}
        ></div>
      </div>
      <table className="table table-hover myTable-history" style={{ alignContent: 'center', hover: '20' }}>
        <thead>
          <tr className="firstRow">
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Video</th>
          </tr>
        </thead>
        <tbody>
          {fallHistory && fallHistory.length > 0 ? (
            fallHistory.map((fall, index) => (
              <tr className="rows" key={index}>
                <th scope="row">{index + 1}</th>
                <td>{fall.date.split(' ')[0]}</td>
                <td>{fall.date.split(' ')[1]}</td>
                <td>
                  <a href={fall.video_url} target="_blank" rel="noopener noreferrer">
                    <svg
                      style={{ fill: 'black' }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-caret-right-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      <path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z" />
                    </svg>
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr className="rows">
              <td colSpan="3">No fall detected</td>
            </tr>
          )}
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