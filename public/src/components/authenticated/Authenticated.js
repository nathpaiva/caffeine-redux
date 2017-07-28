import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({ ...props, component: Component, ...rest }) => (
  <Route {...rest} render={(matchProps) => {
    if (!localStorage.getItem('auth-token')) {
      return (<Redirect to="/?msg=Vôce não pode acessar a página... é preciso estar logado!!!" />);
    } else {
      return (<Component {...props} {...matchProps} />);
    }
  }} />
);

export default Authenticated;
