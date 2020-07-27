import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBmBzkqaGDAmeZ6RfzdBDB8XwJo83aTLSs',
  authDomain: 'nus-modsstation.firebaseapp.com',
  databaseURL: 'https://nus-modsstation.firebaseio.com',
  projectId: 'nus-modsstation',
  storageBucket: 'nus-modsstation.appspot.com',
  messagingSenderId: '37374035616',
  appId: '1:37374035616:web:52a17329c19371e571ebc5',
  measurementId: 'G-34GTB1LFSE',
};

firebase.initializeApp(firebaseConfig);

export const fb = firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();

//firestore.settings({ experimentalForceLongPolling: true });
