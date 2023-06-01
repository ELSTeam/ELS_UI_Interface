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
        birthDay: props.BirthDay,
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
                console.log(data.birthDay);
    
                // Extract and convert birthdate to required format
                let dateParts = data.birthDay.split("-");
                let date = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`);
                let year = date.getFullYear();
                let month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0-indexed in JavaScript
                let day = ("0" + date.getDate()).slice(-2);
                let formattedDate = `${year}-${month}-${day}`; // "yyyy-MM-dd"
    
                setUserData({
                    username: data.username || props.username,
                    password: data.password || props.password,
                    email: data.email,
                    birthDay: formattedDate,
                    profilePicture: data.profilePicture || props.profilePicture || defualtProfile,
                });
            } else {
                console.error(`Failed to fetch user data for ${props.username}`);
            }
        };

        fetchUserData();
    }, [props.username, props.password, props.Email, props.BirthDay, props.profilePicture]);


    const fetchUserPicture = async () => {
      const response = await fetch(`${SERVER_URL}/get_photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: props.username }),
      });

      if (response.ok) {
        const data = await response.text();
        if (data.startsWith('https://')) {
          setImage(data);
        } else {
          console.error(`Invalid response: ${data}`);
        }
      } else {
        console.error(`Failed to fetch image`);
      }
    };

    useEffect(() => {
      fetchUserPicture();
    }, []);
    

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
          case "birthDay":
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
      
    
      const handleImageChange = async (file) => {
            setUserData({ ...userData, "profilePicture": file });
            let newFileName;
            if (file.name) {
                newFileName = `${file.name.split('.')[0]}#${props.username}.png`;
            }
            else {
                const randomString = Math.random().toString(36).substring(2, 8);
                newFileName = `${randomString}#${props.username}.jpg`;
            }
            const newFile = new File([file], newFileName, { type: file.type });
            const formData = new FormData();
            formData.append('file', newFile);
            const response = await fetch(`${SERVER_URL}/upload_photo`, {
                method: 'POST',
                body: formData,
            });
            fetchUserPicture();
            if (response.ok) {
                console.log('Upload successful');
                fetchUserPicture();
            } else {
                console.error(`Upload failed: ${response.status} ${response.statusText}`);
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
          key === "profilePicture" ? (
            <div key={key} className={`form-item`}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label htmlFor="profile-picture-input">
                  <div
                    style={{
                      width: "130px",
                      height: "130px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      marginLeft: "408%",
                      marginTop: "15%",
                      marginBottom: "20%",
                      border: "2px solid light-grey",
                    }}
                  >
                    <img
                      src={image || userData.profilePicture}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      alt="profile"
                    />
                  </div>
                </label>
                <input
                  id="profile-picture-input"
                  type="file"
                  name={key}
                  onChange={(event) => handleImageChange(event.target.files[0])}
                  disabled={!isEditing}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          ) : (
            <div key={key} className={`form-item`}>
              <label>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
                <input 
                  type={getInputType(key)}
                  name={key}
                  value={userData[key]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{ fontSize: "20px", padding: "14px" }}
                />
              </label>
            </div>
          )
        ))}
        <div style={{ alignContent: "center", textAlign: "center", marginLeft: "33%", width: "35%" }}>
          {isEditing ? (
            <button type="button" className="button-login" style={{ marginBottom: "5%", fontFamily: 'Trebuchet MS', fontSize: '24px', textShadow: 'black'}} onClick={handleSave}>
              Save
            </button>
          ) : (
            <button type="button" className="button-login" style={{ marginBottom: "5%", fontFamily: 'Trebuchet MS', fontSize: '24px', textShadow: 'black'}} onClick={handleEdit}>
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




