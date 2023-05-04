import './MyAccount.css';
import React, { useState } from 'react';
import LobbyPage from '../LobbyPage/LobbyPage';
import { SERVER_URL } from '../config';

const MyAccount = (props) => {
    const [ShowLobby, setShowLobby] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        username: props.username,
        password: props.password,
        email: props.Email,
        birthdate: props.BirthDay,
        profilePicture: props.profilePicture,
      });

    if (ShowLobby) {
    return <LobbyPage username={props.username} password={props.password} Email={props.Email} BirthDay={props.BirthDay} profilePicture={props.profilePicture} />;
    }

    const handleLobbyClick = (event) => {
    event.preventDefault();
    setShowLobby(true);
    };
    
    const getInputType = (key) => {
        switch (key) {
          case "username":
            return "text";
          case "birthdate":
            return "date";
          case "password":
            return "password";
          case "email":
            return "email";
          case "profilePicture":
            return "file";
          default:
            return "text";
        }
      };
      
    
      const handleChange = (e) => {
        if (e.target.name === "profilePicture") {
          setUserData({ ...userData, [e.target.name]: e.target.files[0] });
        } else {
          setUserData({ ...userData, [e.target.name]: e.target.value });
        }
      };
    
      const handleEdit = () => {
        setIsEditing(true);
      };
    
      // const updateUserDetails = () => {
      //   const requestOptions = {
      //     method: "PUT",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(userData),
      //   };
    
      //   fetch(`${SERVER_URL}/update_user`, requestOptions)
      //     .then((response) => response.json())
      //     .then((data) => {
      //       console.log("User data updated:", data);
      //     })
      //     .catch((error) => {
      //       console.error("Error updating user data:", error);
      //     });
      // };

      const handleSave = () => {
        setIsEditing(false);
        //console.log("Data saved:", userData);
        //updateUserDetails();
      };
    

      return(
        <div className='main-div'>
        <div>
        <div className='myAccount-header' >My Account </div>
        <div className='logo-img' style={{width:'120px', height:'120px', marginTop:'-100px',borderRadius:'16px'}}>
            </div>
        </div>
        <form className="main-table">
        <div className="form-container">
       
        {Object.keys(userData).map((key) => (
          <div key={key} className={`form-item`}>
                      <label>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
            {key === "profilePicture" ? (
              <input
                type={getInputType(key)}
                name={key}
                onChange={handleChange}
                disabled={!isEditing}
                accept="image/*"
              />
            ) : (
              <input
                type={getInputType(key)}
                name={key}
                value={userData[key]}
                onChange={handleChange}
                disabled={!isEditing}
              />
            )}

          </label>
          </div>
        ))}
        <div style={{alignContent:'center', textalign: 'center', marginLeft:'25%', width:'50%'}}>
        {isEditing ? (
            <button type="button" style={{color:'black', fontFamily: 'Trebuchet MS', width:'50%'}} onClick={handleSave}>
              Save
            </button>
          ) : (
            <button type="button" style={{color:'black', fontFamily: 'Trebuchet MS', width:'50%'}} onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
        
        </div>
      </form>
        <div className="footer">
        <p className='BackToLobby'>Back to <a href= "/lobby" style={{color: 'black'}} onClick={handleLobbyClick}> Lobby</a></p>
        </div>


        </div>



        
    );
};

export default MyAccount;