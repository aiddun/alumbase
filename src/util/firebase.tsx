import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDy1MGvxdINrkDO-GIolbqnFbqUmWISD98",
  authDomain: "alumbase-adts.firebaseapp.com",
  projectId: "alumbase-adts",
  storageBucket: "alumbase-adts.appspot.com",
  messagingSenderId: "601692437336",
  appId: "1:601692437336:web:fbf4ed72854339f6a7432d",
};

console.log(import.meta.env)
firebase.initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG));

export const functions = firebase.functions();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();

export const searchMembers = functions.httpsCallable("searchMembers");
