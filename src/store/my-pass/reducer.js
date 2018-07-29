import * as Constants from './constants';

export const initialState = {
  reducer_version: '0.0.0'
};

const handlers = {
  [Constants.USER_SIGNED_IN]: (state, action) => {
    return {
      ...state,
      user: action.payload
    };
  },
  [Constants.NEW_USER_SESSION]: (state, action) => {
    return {
      ...state,
      session: action.payload,
      user: action.payload
    };
  },
  // [Constants.USER_SIGNED_OUT]: (state, action) => {
  //   return {
  //     ...state,
  //     user: action.payload
  //   };
  // }
};

export default (state = initialState, action) => {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};
