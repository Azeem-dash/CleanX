/* eslint-disable prettier/prettier */
import _ from 'lodash';
import {actionTypes} from '../../actions/actionType/index';

const initialState = {
  user: null,
  UserType: null,
  SetType: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'authentication': {
      return {...state, user: action.payload};
    }
    case 'UserType': {
      return {...state, UserTypeStatus: action.payload};
    }
    case 'SetType': {
      return {...state, SetTypeStatus: action.payload};
    }
    default:
      return {...state};
  }
};

export default authReducer;
