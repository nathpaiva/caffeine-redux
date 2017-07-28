import React from 'react';

import logo from '../../images/logo.png';

const style = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: '0 auto',
    borderBottom: '1px solid rgb(90, 74, 105)',
    backgroundColor: '#fff'
  },
  img: {
    width: '90px'
  },
  hide: {
    display: 'block',
    position: 'absolute',
    textIndent: '-9999px'
  },
};

const Header = () => (
  <header style={style.header}>
    <h1><img style={style.img} src={logo} alt='Caffeine' /><span style={style.hide}>Caffeine</span></h1>
  </header>
);

export default Header;
