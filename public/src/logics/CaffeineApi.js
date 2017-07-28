'user strict';

import { allCapsules, showMessage } from '../actions/actionCreator';


export function getAllItems(token, user_id, type) {
  const requests = {
    method: 'GET',
    headers: new Headers({
      'Content-type': 'application/json',
      'x-access-token': JSON.parse(token)
    })
  };
  let url = `http://localhost:3000/api/auth/capsules/${user_id}`;
  if (type === 'one') {
    url = `http://localhost:3000/api/auth/capsule/${user_id}`;
  }

  return dispatch => {
    fetch(url, requests)
      .then(response => response.json())
      .then(response => {

        let message = {};

        if (!response.success) {
          message = {
            msg: response.message,
            typeMesage: 'error'
          }
          dispatch(showMessage(message));

          // if (message.msg === 'Failed to authenticate token.') {
          //   // this.props.history.push(`/logout`);
          //   // dispatch(push('/logout'));
          // }

          throw new Error(message.msg);
          return;
        }

        message = {
          msg: '',
          typeMesage: ''
        };

        dispatch(showMessage(message));
        let capsules = response.capsules;
        if (type === 'one') {
          capsules = [capsules];
        }
        dispatch(allCapsules(capsules));
      });
  }
}

export function createItem(capsule, type) {
  let url = `http://localhost:3000/api/auth/capsules/${capsule.user_id}`;
  let method = 'POST';
  if (type === 'one') {
    method = 'PUT';
    url = `http://localhost:3000/api/auth/capsule/${capsule.capsule_id}`;
  }

  delete capsule.capsule_id;

  const request = {
    method,
    body: JSON.stringify(capsule),
    headers: new Headers({
      'Content-type': 'application/json',
      'x-access-token': JSON.parse(localStorage.getItem('auth-token'))
    })
  };

  return dispatch => {
    fetch(url, request)
      .then(response => response.json())
      .then(response => {

        let message = {};

        if (!response.success) {
          message = {
            msg: 'Error to add capsule',
            typeMesage: 'error'
          }
          dispatch(showMessage(message));

          throw new Error(message.msg);
          return;
        }

        message = {
          msg: type === 'one' ? 'Change success!' : 'Create success',
          typeMesage: 'success'
        }
        dispatch(showMessage(message));
      });
  }
}

export function removeItem(user_id, capsule_id) {

  const requests = {
    method: 'DELETE',
    headers: new Headers({
      'Content-type': 'application/json',
      'x-access-token': JSON.parse(localStorage.getItem('auth-token'))
    })
  };

  const url = `http://localhost:3000/api/auth/capsules/${user_id}/${capsule_id}`;
  return dispatch => {
    fetch(url, requests)
      .then(response => response.json())
      .then(response => {
        let message = {};
        if (!response.success) {
          message = {
            msg: response.message,
            typeMesage: 'error'
          }
          dispatch(showMessage(message));

          throw new Error(message.msg);
          return;
        }

        message = {
          msg: 'Capsula removida com sucesso',
          typeMesage: 'success'
        };

        dispatch(showMessage(message));
        dispatch(allCapsules(response.capsules));
      });
  }
}
