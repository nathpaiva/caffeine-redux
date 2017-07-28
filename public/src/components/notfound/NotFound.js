import React from 'react';

const style = {
  title: {
    fontSize: '40px',
    textAlign: 'center',
    margin: '40px 0',
  },
  container: {
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
    fontSize: '13px',
  },
  list: {
    margin: '0 5px'
  }
}

const NotFound = () => (
  <div>
    <h3 style={style.title}>Page not found :(</h3>
    <ul style={style.container}>
      <li style={style.list}><a href="/">Login</a></li>
    </ul>
  </div>
);

export default NotFound;
