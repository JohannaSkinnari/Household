import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyABL2ch17eRIgySDn24CzBDnklQCFUDJ_0",
  authDomain: "household-6563e.firebaseapp.com",
  projectId: "household-6563e",
  storageBucket: "household-6563e.appspot.com",
  messagingSenderId: "510651625283",
  appId: "1:510651625283:web:787ecbc9dbcd7ac6eec9f6",
  measurementId: "G-3WWJTBGF85",
};

const Firebase = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

export default Firebase;
