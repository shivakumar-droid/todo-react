import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

//Firebase Configuration

const firebaseConfig = {
  apiKey: "AIzaSyCUovoSnBFaNerfUf41-3CHOGJxXEAdOYU",
  authDomain: "todo-app-606ba.firebaseapp.com",
  projectId: "todo-app-606ba",
  storageBucket: "todo-app-606ba.appspot.com",
  messagingSenderId: "200820071948",
  appId: "1:200820071948:web:81e0bafe31d3074ae55829",
};

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();

export default firebase;
