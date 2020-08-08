import { Component } from 'react';

class Logout extends Component {
  // @TODO refactor
  UNSAFE_componentWillMount() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}

export default Logout;
