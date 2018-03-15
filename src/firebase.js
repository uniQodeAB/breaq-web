import firebase from 'firebase';
// Initialize Firebase
const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: 'breaq-uniqode.firebaseapp.com',
  databaseURL: 'https://breaq-uniqode.firebaseio.com',
  projectId: 'breaq-uniqode',
  storageBucket: 'breaq-uniqode.appspot.com',
  messagingSenderId: '728259108467'
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
