import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllItems, removeItem } from '../../logics/CaffeineApi';

import Message from '../message/Message';
import Box from '../box/Box';

class List extends Component {

  componentDidMount() {
    this.props.list(localStorage.getItem('auth-token'), this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <Message className={this.props.typeMesage} msg={this.props.msg} />
        <Box title='Info capsule' button='Add new capsule' to={`/create/${this.props.match.params.id}`} />
        {this.props.capsules.map(capsule => <Box link={[{
          text: 'edit',
          to: `/edit/${this.props.match.params.id}/${capsule._id}`
        }, {
          text: 'remove',
          action: () => {
            this.props.removeItem(this.props.match.params.id, capsule._id);
          }
        }]} key={capsule._id} inputs={[
          { type: 'text', id: 'brand', text: capsule.brand_capsule, label: 'Capsule brand:', disabled: true },
          { type: 'text', id: 'type', text: capsule.type_capsule, label: 'Capsule name:', disabled: true },
          { type: 'number', id: 'price', text: capsule.price_last_buy, label: 'Last price paied:', disabled: true },
          { type: 'number', id: 'weekcapsules', text: capsule.quantity_capsules_per_week, label: 'Quantity capsules per week:', disabled: true },
          { type: 'number', id: 'notify', text: capsule.notify_enf_capsules, label: 'Notify end capsules:', disabled: true }
        ]} />
        )}
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    list: (token, user_id) => {
      dispatch(getAllItems(token, user_id));
    },
    removeItem: (user_id, capsule_id) => {
      dispatch(removeItem(user_id, capsule_id));
    }
  }
}

const mapStateToProps = state => {
  return {
    capsules: state.capsulesReducer,
    typeMesage: state.messageReducer.typeMesage,
    msg: state.messageReducer.msg
  }
}

const ListRedux = connect(mapStateToProps, mapDispatchToProps)(List);

export default ListRedux;
