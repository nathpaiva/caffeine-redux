import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllItems, createItem } from '../../logics/CaffeineApi';

import Box from '../box/Box';

class Edit extends Component {

  componentDidMount() {
    this.props.list(localStorage.getItem('auth-token'), this.props.match.params.id);
  }

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
          "capsule_id": this.props.match.params.id,
          "user_id": this.props.match.params.user_id,
          "user_name": user.user_name
        }
        this.props.handleClick(newCapsule);
      }}>
        {this.props.capsules.map(capsule => <Box title='Info capsule' key={capsule._id} link={[{
          text: 'back to list',
          to: `/list/${this.props.match.params.user_id}`
        }]} inputs={[
          { type: 'text', id: 'brand', text: capsule.brand_capsule, label: 'Capsule brand:', defaultValue: capsule.brand_capsule, inputRef: (input) => this.brand = input },
          { type: 'text', id: 'type', text: capsule.type_capsule, label: 'Capsule name:', defaultValue: capsule.type_capsule, inputRef: (input) => this.type = input },
          { type: 'number', id: 'price', text: capsule.price_last_buy, label: 'Last price paied:', defaultValue: capsule.price_last_buy, inputRef: (input) => this.price = input },
          { type: 'number', id: 'weekcapsules', text: capsule.quantity_capsules_per_week, label: 'Quantity capsules per week:', defaultValue: capsule.quantity_capsules_per_week, inputRef: (input) => this.weekcapsules = input },
          { type: 'number', id: 'notify', text: capsule.notify_enf_capsules, label: 'Notify end capsules:', defaultValue: capsule.notify_enf_capsules, inputRef: (input) => this.notify = input }
        ]} button='Change capsule' />
        )}
      </form>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    list: (token, user_id) => {
      dispatch(getAllItems(token, user_id, 'one'));
    },
    handleClick: (capsule) => {
      dispatch(createItem(capsule, 'one'));
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

const EditRedux = connect(mapStateToProps, mapDispatchToProps)(Edit);

export default EditRedux;
