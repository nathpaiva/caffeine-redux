import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.png';
import style from './header.css';


const user = () => {
  return JSON.parse(localStorage.getItem('user'))
};

const Header = () => (
  <header style={style.header}>
    <div style={!!localStorage.getItem('user') ? style.container : style.containerLogout}>
      <h1><img style={style.img} src={logo} alt='Caffeine' /><span style={style.hide}>Caffeine</span></h1>
      {!!user() && <div style={style.utils}>
        <span style={style.welcomeblock}>Welcome {user().user_name}</span>
        <Link style={style.link} to='/logout'>logout</Link>
      </div>}
    </div>
  </header>
);

export default Header;
