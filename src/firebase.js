// This is where we set up firebase for our app
import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_ID,
  messagingSenderId: process.env.REACT_APP_MESSENGER_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

// export our authentication instance
export const auth = app.auth();
export default app;
