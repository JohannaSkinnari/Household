import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


firebase.initializeApp({
    apiKey: "AIzaSyABL2ch17eRIgySDn24CzBDnklQCFUDJ_0",
    authDomain: "household-6563e.firebaseapp.com",
    projectId: "household-6563e",
    storageBucket: "household-6563e.appspot.com",
    messagingSenderId: "510651625283",
    appId: "1:510651625283:web:787ecbc9dbcd7ac6eec9f6",
    measurementId: "G-3WWJTBGF85"
	}
)


export const firestore = firebase.firestore();
export const auth = firebase.auth();
//export const provider = new firebase.auth.GoogleAuthProvider();
