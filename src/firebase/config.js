import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBx8fYfeTxEYk3EETt6ZB73EMWKdvS41nQ",
  authDomain: "mymoney-7e11c.firebaseapp.com",
  projectId: "mymoney-7e11c",
  storageBucket: "mymoney-7e11c.appspot.com",
  messagingSenderId: "498904612907",
  appId: "1:498904612907:web:e4b0294311f6d5b2d22a6e"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize services
const projectFirestore = firebase.firestore();

export { projectFirestore };