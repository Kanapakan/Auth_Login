import firebase from "firebase";
import firebaseConfig from "./config";


// import firebase from '../firebase'

  
  function initFirebase() {
    if (!firebase.app.length) {
    firebase.initializeApp(firebaseConfig);
  } }
  initFirebase()
  // Initialize Firebase
  
  //  const db = firebase.firestore();
  //  const realtimeDb = firebase.database();
  export  { firebase };