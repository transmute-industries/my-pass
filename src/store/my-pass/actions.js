import firebase from '../../firebase';


export const signIn = () => {
  firebase
    .auth()
    .signInAnonymously()
    .catch(function(error) {
      console.log('error: ', error);
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // ...
    
    });
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .catch(function(error) {
      console.log('error: ', error);
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // ...
    });
};

