import './MyContacts.css';
import React from 'react';

const MyContacts = () => {
    return (
        
        <div className='main-div'>
        <div>
        <div className='myContacts-header'>My Contacts</div>
        </div>
        <div className='divButton' >
        <button className='button' style={{marginLeft:'-850px'}} >
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16" style={{color:'black', marginLeft:'-19px', marginTop:'-12px'}}>
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
        </button>    
        <div style={{color:'black', alignContent:'center', fontFamily:'Trebuchet MS', fontSize:'20px', marginLeft:'-680px', marginTop:'-30px'}}>
        <span>Add contacts</span>
        </div>
        </div>
        <table class="table table-hover" className='myTable' style={{alignContent:'center', hover:'20'}}>
  <thead>
    <tr className='firstRow'>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Phone</th>
      <th scope="col">Email</th>
      <th scope="col">Priority</th>
    </tr>
  </thead>
  <tbody>
    <tr className='rows'>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>050000</td>
      <td>@mdo</td>
      <td>1</td>
    </tr>
    <tr className='rows'>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>0540000</td>
      <td>@fat</td>
      <td>5</td>
    </tr>
    <tr className='rows'>
      <th scope="row">3</th>
      <td>Aviya</td>
      <td>052000</td>
      <td>@twitter</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
        </div>
        
    );
};

export default MyContacts;
