import './MyAccount.css';
import React, { useEffect, useState } from 'react';
import LobbyPage from '../LobbyPage/LobbyPage';
import { SERVER_URL } from '../config';
import defualtProfile from "../defualt.png"

const MyAccount = (props) => {
    const [ShowLobby, setShowLobby] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(null);
    const [userData, setUserData] = useState({
        username: props.username,
        password: props.password,
        email: props.Email,
        birthdate: props.BirthDay,
        profilePicture: props.profilePicture || defualtProfile,
      });

      useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`${SERVER_URL}/get_data_of_user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: props.username }),
            });
    
            if (response.ok) {
                const data = await response.json();
    
                // Extract and convert birthdate to required format
                let dateParts = data.birthDay.split("/");
                let date = new Date(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`);
                let year = date.getFullYear();
                let month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0-indexed in JavaScript
                let day = ("0" + date.getDate()).slice(-2);
                let formattedDate = `${year}-${month}-${day}`; // "yyyy-MM-dd"
    
                setUserData({
                    username: data.username || props.username,
                    password: data.password || props.password,
                    email: data.email,
                    birthdate: formattedDate,
                    profilePicture: data.profilePicture || props.profilePicture || defualtProfile,
                });
            } else {
                console.error(`Failed to fetch user data for ${props.username}`);
            }
        };
    
        fetchUserData();
    }, [props.username, props.password, props.Email, props.BirthDay, props.profilePicture]);
    

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
      
    
      const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        const reader = new FileReader();
    
      const newFileName = `${selectedImage.name}#${userData.username}`;
      const newFile = new File([selectedImage], newFileName, { type: selectedImage.type });

      reader.onload = () => {
        setImage(reader.result);
    
        // Send POST request to upload photo
        const formData = new FormData();
        formData.append('file', newFile);
    
        fetch(`${SERVER_URL}/upload_photo`, {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            // Handle response
          })
          .catch((error) => {
            // Handle error
          });
      };
      reader.readAsDataURL(selectedImage);
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
    
      const updateUserDetails = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        };
    
        fetch(`${SERVER_URL}/update_user_details`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log("User data updated:", data);
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
    };
    
      const handleSave = () => {
        setIsEditing(false);
        //console.log("Data saved:", userData);
        updateUserDetails();
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
              <div >
                <div style={{marginTop: "5%", float: "left", width: "30%", marginLeft: "34.8%", color:"transparent"}}>
                <input
                    type="file"
                    name={key}
                    onChange={handleImageChange}
                    disabled={!isEditing}
                    accept="image/*"
                    style={{borderRadius: "0%", color:'transparent'}}
                  />
                  </div>
                  <div style={{ background: "transparent"}}>
                  <card style={{width: "fit-content", marginTop: "-5%"}}>
                  <img 
                  src={ image || userData.profilePicture} // use preview if available, else use userData.profilePicture
                  style={{borderRadius: "10rem", width:"20%", color: "white"}}
                  alt="profile"
                  />
                  </card>
                  </div>
              </div>
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




