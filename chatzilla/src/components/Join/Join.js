import React, { useState } from 'react';
import './Join.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

let user;
const sendUser = () => {
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = '';
};

const Join = () => {
  const [name,setName]= useState('') ;
  // console.log(name);
  return (
    <div className='joinPage'>
      <div className='joinContainer'>
        <img src={logo} alt='logo' />
        <h1>ChatZilla</h1>
        <input onChange={(e)=> setName(e.target.value)} type='text' placeholder='Username' id='joinInput' />
        <Link onClick={(e)=>!name ?e.preventDefault():null} to='/chat'>
          <button onClick={sendUser} className='joinBtn'>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
