import firebase from 'firebase';

var app = firebase.initializeApp({
  apiKey: 'AIzaSyCHuh0YSTnAfgER3Pa2Bd5nDvd19ieoxLM',
  authDomain: 'mypass-atx.firebaseapp.com',
  databaseURL: 'https://mypass-atx.firebaseio.com',
  projectId: 'mypass-atx',
  storageBucket: 'mypass-atx.appspot.com',
  messagingSenderId: '21182140353'
});

export default app;
