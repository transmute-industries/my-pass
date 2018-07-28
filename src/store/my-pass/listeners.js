import firebase from '../../firebase';

import { store } from '../../store';

import * as actionCreators from './actionCreators';

export const auth = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('logged in');
      store.dispatch(actionCreators.userSignedIn(user));
    } else {
      // No user is signed in.
      console.log('logged out');
      store.dispatch(actionCreators.userSignedOut());
    }
  });
};
