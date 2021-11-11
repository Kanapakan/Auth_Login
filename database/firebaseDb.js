import firebase from "firebase";
import firebaseConfig from "./config";


// import firebase from '../firebase'

  
  
  // Initialize Firebase
  if (!firebase.app.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  export default db;