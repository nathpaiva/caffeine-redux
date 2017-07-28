import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllItems, removeItem, createItem } from '../../logics/CaffeineApi';

import Message from '../message/Message';
import Box from '../box/Box';

import style from '../../css/inline';


class Create extends Component {
  render() {
    return (
      <form onSubmit={e => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const newCapsule = {
          "notify_enf_capsules": this.notify.value,
          "quantity_capsules_per_week": this.weekcapsules.value,
          "price_last_buy": this.price.value,
          "brand_capsule": this.brand.value,
          "type_capsule": this.type.value,
          "user_id": this.props.match.params.id,
          "user_name": user.user_name
        }
        this.props.handleClick(newCapsule);
      }}>
        <Message className={this.props.typeMesage} msg={this.props.msg} />
        <Box title='Create capsule' link={[{
          text: 'back to list',
          to: `/list/${this.props.match.params.id}`
        }]} inputs={[
          { type: 'text', id: 'brand', text: '', label: 'Capsule brand:', inputRef: (input) => this.brand = input },
          { type: 'text', id: 'type', text: '', label: 'Capsule name:', inputRef: (input) => this.type = input },
          { type: 'number', id: 'price', text: '', label: 'Last price paied:', inputRef: (input) => this.price = input },
          { type: 'number', id: 'weekcapsules', text: '', label: 'Quantity capsules per week:', inputRef: (input) => this.weekcapsules = input },
          { type: 'number', id: 'notify', text: '', label: 'Notify before end:', inputRef: (input) => this.notify = input }
        ]} button='Save' />
      </form>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (capsule) => {
      dispatch(createItem(capsule));
    }
  }
}

const mapStateToProps = state => {
  return {
    typeMesage: state.messageReducer.typeMesage,
    msg: state.messageReducer.msg
  }
}

const CreateRedux = connect(mapStateToProps, mapDispatchToProps)(Create);

export default CreateRedux;




