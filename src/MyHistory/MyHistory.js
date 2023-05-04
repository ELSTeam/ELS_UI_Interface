import './MyHistory.css';
import React, { useState } from 'react';
import LobbyPage from '../LobbyPage/LobbyPage';


const MyHistory = (props) => {

const [ShowLobby, setShowLobby] = useState(false);

if (ShowLobby) {
  return <LobbyPage username={props.username} password={props.password} BirthDay={props.BirthDay} Email={props.Email}/>;
}

const handleLobbyClick = (event) => {
  event.preventDefault();
  setShowLobby(true);
};

    return (
        
        <div className='main-div'>
        <div>
        <div className='myContacts-header'>My History</div>
        <div className='logo-img' style={{width:'120px', height:'120px', marginTop:'-100px',borderRadius:'16px'}}>
            </div>
        </div>
        <table class="table table-hover" className='myTable-history' style={{alignContent:'center', hover:'20'}}>
  <thead>
    <tr className='firstRow'>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">who cared</th>
    </tr>
  </thead>
  <tbody>
    <tr className='rows'>
      <th scope="row">1</th>
      <td>22/3</td>
      <td>09:00</td>
      <td>Omer</td>
    </tr>
    <tr className='rows'>
      <th scope="row">2</th>
      <td>5/7</td>
      <td>09:00</td>
      <td>Aviya</td>
    </tr>
    <tr className='rows'>
      <th scope="row">3</th>
      <td>25/8</td>
      <td>09:00</td>
      <td>Avital</td>
    </tr>
  </tbody>
</table>
<div className="footer">
<p className='BackToLobbyFromHistory'>Back to <a href= "/lobby" style={{color: 'black'}} onClick={handleLobbyClick}> Lobby</a></p>
</div>
        </div>
        
    );
};

export default MyHistory;
