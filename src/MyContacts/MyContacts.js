import './MyContacts.css';
import React, { useState, useEffect } from 'react';
import LobbyPage from '../LobbyPage/LobbyPage';
import { SERVER_URL } from '../config';

const MyContacts = (props) => {
const [ShowLobby, setShowLobby] = useState(false);
const [showAddContact, setShowAddContact] = useState(false);
const [ShowContacts, setShowContacts] = useState(false);
const [contactName, setContactName] = useState('');
const [telephone, setTelephone] = useState('');
const [mail, setMail] = useState('');
const [priority, setPriority] = useState('');
const { contactList, setContactList } = props;
const [dataError, setDataError] = useState('');

useEffect(() => {
  fetchContacts();
}, []);


if (ShowLobby) {
  return <LobbyPage username={props.username} password={props.password} BirthDay={props.BirthDay} Email={props.Email} contactList={contactList} setContactList={setContactList}/>;
}

if (ShowContacts){
  return <MyContacts username={props.username} password={props.password} BirthDay={props.BirthDay} Email={props.Email} contactList={contactList} setContactList={setContactList}/>;
}

const handleLobbyClick = (event) => {
  event.preventDefault();
  setShowLobby(true);
};

const handleContacts = (event) => {
  event.preventDefault();
  setShowContacts(true);
}; 

const handleAddContactClick = (event) => {
  event.preventDefault();
  setShowAddContact(true);
};

const handleContactNameChange = (event) => {
  setContactName(event.target.value);
};

const handleTelephoneChange = (event) => {
  setTelephone(event.target.value);
};

const handleMailChange = (event) => {
  setMail(event.target.value);
};


const handleDelete = (contactName) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: props.username,
      contact_name: contactName,
    }),
  };

  fetch(`${SERVER_URL}/delete_contact`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('Contact deleted:', data);
      // Update the contactList UI
      setContactList(contactList.filter((contact) => contact.name !== contactName));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

const fetchContacts = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  fetch(`${SERVER_URL}/all_contacts?username=${props.username}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching contacts: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      setContactList(data.contacts);
    })
    .catch((error) => {
      console.error(error);
    });
};


const addContact = () => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: props.username,
      contact_info: {
        name: contactName,
        phone: telephone,
        email: mail,
      },
    }),
  };

  fetch(`${SERVER_URL}/add_contact`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('Contact added:', data);
        setContactList([...contactList, {
          name: contactName,
          phone: telephone,
          email: mail,
        }]);
      // Clear input fields
      setContactName('');
      setTelephone('');
      setMail('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

const handleSubmit = (event) => {
  event.preventDefault();
  if (mail.length == 0 || telephone.length == 0 || contactName.length == 0){
  setDataError('Please enter your data');
       return;
}
  // Add contact to database
  addContact();
  setShowAddContact(false);
};


if (showAddContact) {
  return (
    <div className='main-div'>
      <div>
        <div className='myContacts-header'>Add Contact</div>
        <div className='logo-img' style={{width:'120px', height:'120px', marginTop:'-100px',borderRadius:'16px'}}>
            </div>
      </div>
      <form className='addContact' onSubmit={handleSubmit} style={{marginTop:'2px'}}>
        <div>
          <label>Name:</label>
          <input type='text' value={contactName} onChange={handleContactNameChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type='text' value={telephone} onChange={handleTelephoneChange} />
        </div>
        <div>
        <label>Email:</label>
          <input type="Email" value={mail} onChange={handleMailChange} />
        </div>
        <div className="invalid-feedback" style={{color: 'red'}}>{dataError}</div>
        <div>
          <button type='submit' style={{fontWeight:'400'}}>Add Contact</button>
        </div>
      </form>
      <div>
<p className='BackToMyContacts'>Back to <a href= "" style={{color: 'black'}} onClick={handleContacts}> my Contacts</a></p>
</div>
    </div>
  );
}

    return (
        <div className='main-div'>
        <div>
        <div className='myContacts-header'>My Contacts</div>
        <div className='logo-img' style={{width:'120px', height:'120px', marginTop:'-100px',borderRadius:'16px'}}>
            </div>
        </div>
        <div className='divButton'>
        <button className='button' style={{marginLeft:'-850px'}} onClick={handleAddContactClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16" style={{color:'black', marginLeft:'-19px', marginTop:'-12px'}}>
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
        </button>    
        <div style={{color:'black', alignContent:'center', fontFamily:'Trebuchet MS', fontSize:'20px', marginLeft:'-680px', marginTop:'-30px'}}>
        <span>Add contact</span>
        </div>
        </div>
        <table class="table table-hover" className='myTable' style={{alignContent:'center', hover:'20'}}>
  <thead>
    <tr className='firstRow'>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Phone</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {contactList.map((contact, index) => (
    <tr className='rows' key={index}>
      <th scope="row">{index + 1}</th>
      <td>{contact.name}</td>
      <td>{contact.phone}</td>
      <td>{contact.email}</td>
      <td>
      <button className='button-delete-contact' onClick={() => handleDelete(contact.name)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
      </svg>
    </button>
    
      </td>
    </tr>
  ))}
  </tbody>
</table>
<div className="footer">
  <p className='BackToLobbyFromMyContact'>Back to <a href= "/lobby" style={{color: 'black'}} onClick={handleLobbyClick}> Lobby</a></p>
</div>
</div>
        
    );
};

export default MyContacts;