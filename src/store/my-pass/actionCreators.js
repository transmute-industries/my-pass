import * as Constants from './constants';

export const userSignedIn = user => {
  return {
    type: Constants.USER_SIGNED_IN,
    payload: user
  };
};

export const userSignedOut = () => {
  return {
    type: Constants.USER_SIGNED_OUT,
    payload: null
  };
};
