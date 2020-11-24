import firebase from "firebase/app";
import "firebase/firestore";

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBq0T0fSgyAkn5Ozqa7pQ6vmlLahPcmKvg",
    authDomain: "spa-vue-app-fire.firebaseapp.com",
    databaseURL: "https://spa-vue-app-fire.firebaseio.com",
    projectId: "spa-vue-app-fire",
    storageBucket: "spa-vue-app-fire.appspot.com",
    messagingSenderId: "435784031550",
    appId: "1:435784031550:web:04464e2fdb84c7bf4f606f"
  };
  // Initialize Firebase
  export const db = firebase.initializeApp(firebaseConfig).firestore();