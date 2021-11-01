import firebase from "firebase";
import firebaseConfig from "./config";


// import firebase from '../firebase'

  
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  export default db;