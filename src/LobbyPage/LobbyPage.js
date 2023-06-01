import './LobbyPage.css';
import React, {useState, useEffect} from 'react';
import MyContacts from '../MyContacts/MyContacts';
import MyHistory from '../MyHistory/MyHistory';
import MyAccount from '../MyAccount/MyAccount';
import AboutUs from '../AboutAs/AboutAs';
import defaultProfile from "../defualt.png";
import { SERVER_URL } from '../config';


const LobbyPage = (props) => {

    const [ShowContacts, setShowContacts] = useState(false);
    const [ShowHistory, setShowHistory] = useState(false);
    const [ShowAccount, setShowAccount] = useState(false);
    const [contactList, setContactList] = useState([]);
    const [ShowAboutUs, setShowAboutUs] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        setImage(defaultProfile);
        fetch(`${SERVER_URL}/get_photo`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: props.username })
        }).then((response) => {
          if (response.status === 200) {
            response.text().then((text) => {
              setImage(text);
            });
          } else {
            setImage(defaultProfile);
          }
        });
      }, []);


    if (ShowContacts){
        return <MyContacts username={props.username} password={props.password} BirthDay={props.BirthDay} Email={props.Email} contactList={contactList} setContactList={setContactList}/>;
    }

    if (ShowHistory){
        return <MyHistory username={props.username} password={props.password} BirthDay={props.BirthDay} Email={props.Email}/>;
    }

    if (ShowAccount){
        return <MyAccount username={props.username} password={props.password} BirthDay={props.BirthDay} Email={props.Email} profilePicture={props.profilePicture}/>;
    }

      if (ShowAboutUs) {
        return <AboutUs username={props.username} password={props.password} BirthDay={props.BirthDay} Email={props.Email}/>
    }

    const handleLogout = () => {
        props.setUsername('');
        props.setPassword('');
        props.setLoggedIn(false);
      };

    const handleHistory = (event) => {
        event.preventDefault();
        setShowHistory(true);
      }; 
      
    const handleContacts = (event) => {
        event.preventDefault();
        setShowContacts(true);
      }; 

      const handleAccount = (event) =>
      {
        event.preventDefault();
        setShowAccount(true);
      };

    return (
        <div className='main-div'>
            <div style={{ display: "flex", display: "inline-block", float: "center"}}>
                <p className='els-header-lobby' >ELS</p>
                <div className='els-sentence-lobby' >Elderly Life Server</div>
            </div>
            <div className='logo-img' style={{width:'200px', height:'200px',borderRadius:'16px', marginTop:'-16%'}}>
            </div>
            <div className='isConnected'>
                <div 
                    style={{ 
                        width: "60px", 
                        height: "60px", 
                        borderRadius: "50%", 
                        overflow: "hidden", 
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        cursor: "pointer", 
                        marginLeft: "-7%",
                        border: "2px solid black",
                        marginTop: "10px" 
                    }}> 
                    <img src={image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt=""/> 
                </div>
                <div className='activeUser' style={{ marginTop: "-11%" }}>Active user - <span>{props.username}</span></div>
            </div>
            
            <div className='four-squares' style={{ float: "center", marginTop:'14%'}}>
            <div>
            <button className='square' style={{ width: "20%"}} onClick={handleContacts} >
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25%" height="25%" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16"  style={{color:'black'}}>
  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
</svg>
                </div>
                <div>
                <span>My contacts</span>
                </div>
            </button>
                <button className='square' style={{ width: "20%"}} onClick={handleHistory}>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25%" height="25%" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16" style={{color:'black'}}>
  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
</svg>
                </div>
                    <div>
                    <span>My history</span>
                    </div>
                </button>
            </div>
                
            <button className='square' style={{ width: "20%"}} onClick={() => setShowAboutUs(true)}>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25%" height="25%" fill="currentColor" class="bi bi-stickies-fill" viewBox="0 0 16 16" style={{color:'black'}}>
  <path d="M0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5A1.5 1.5 0 0 0 0 1.5z"/>
  <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177V10.5z"/>
</svg>
                </div>
                <div>
                <span>About us</span>
                </div>
                </button>

                <button className='square' style={{ width: "20%" }} onClick={handleAccount}>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25%" height="25%" fill="currentColor" class="bi bi-clipboard-data-fill" viewBox="0 0 16 16" style={{color:'black'}}>
  <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1ZM10 8a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V8Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"/>
</svg>
                </div>
                    <div>
                    <span>My account</span>
                    </div>
                </button>
                <div className='logOut'>
                <a href="/loginView" style={{color: 'black'}} onClick={handleLogout}>Log Out</a>
                </div>
            </div>
        </div>
    );
};

export default LobbyPage;
