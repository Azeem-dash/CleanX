import {actionTypes} from './actionType/index';

const setUser = user => async dispatch => {
  dispatch({
    type: actionTypes.AUTHENTICATION,
    payload: user,
  });
};
const UserType = status => async dispatch => {
  // console.log('UserType');

  dispatch({
    type: 'UserType',
    payload: status,
  });
};
const SetType = status => async dispatch => {
  // console.log('SetType');

  dispatch({
    type: 'SetType',
    payload: status,
  });
};
export {setUser, UserType, SetType};
