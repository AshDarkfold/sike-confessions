import * as firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
    apiKey: "AIzaSyByTD84_ywv-lo2Kz5xaR64jHIIDqWju_s",
    authDomain: "confo-c9030.firebaseapp.com",
    databaseURL: "https://confo-c9030.firebaseio.com",
    projectId: "confo-c9030",
    storageBucket: "confo-c9030.appspot.com",
    messagingSenderId: "225713468647",
    appId: "1:225713468647:web:bbe243b64e253088159e42",
    measurementId: "G-GZQRM8JMK5"
  });
  
  export default app;