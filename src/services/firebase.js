// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

// Your app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBUHQ1uCqVubP47CuFUNZYf-PVmMGxdj0",
  authDomain: "study-buddy-3cd13.firebaseapp.com",
  databaseURL: "https://study-buddy-3cd13.firebaseio.com",
  projectId: "study-buddy-3cd13",
  storageBucket: "study-buddy-3cd13.appspot.com",
  messagingSenderId: "1064752044611",
  appId: "1:1064752044611:web:11fd2b806d490ea39e12f6",
  measurementId: "G-CY7VEWV0YB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default firebase;
