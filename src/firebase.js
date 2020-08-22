import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDdfLe8Vg0xLMlVFlyr8k6JsSnqkQqWf6k",
  authDomain: "instagram-clone-react-47.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-47.firebaseio.com",
  projectId: "instagram-clone-react-47",
  storageBucket: "instagram-clone-react-47.appspot.com",
  messagingSenderId: "142842262061",
  appId: "1:142842262061:web:a0da516b30137b6b793ea4",
  measurementId: "G-X5PJGR3CH8"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };