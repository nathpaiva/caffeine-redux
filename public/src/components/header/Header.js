import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.png';

const style = {
  header: {
    width: '100%',
    margin: '0 auto',
    borderBottom: '1px solid rgb(90, 74, 105)',
    backgroundColor: '#fff'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '500px',
    margin: 'auto'
  },
  containerLogout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '500px',
    margin: 'auto'
  },
  utils: {
    width: '150px',
    justifyContent: 'space-between',
    display: 'flex',
    fontSize: '12px',
  },
  img: {
    width: '90px'
  },
  link: {
    textDecoration: 'underline',
  },
  hide: {
    display: 'block',
    position: 'absolute',
    textIndent: '-9999px'
  },
};

const user = JSON.parse(localStorage.getItem('user'));

const Header = () => (
  <header style={style.header}>
    <div style={!!localStorage.getItem('user') ? style.container : style.containerLogout}>
      <h1><img style={style.img} src={logo} alt='Caffeine' /><span style={style.hide}>Caffeine</span></h1>
      {!!localStorage.getItem('user') && <div style={style.utils}>
        Welcome {user.user_name}
        <Link style={style.link} to='/logout'>logout</Link>
      </div>}
    </div>
  </header>
);

export default Header;
