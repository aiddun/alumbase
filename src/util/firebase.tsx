import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

firebase.initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG));

export const functions = firebase.functions();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();

export const searchMembers = functions.httpsCallable("searchMembers");
