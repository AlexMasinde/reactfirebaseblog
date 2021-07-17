import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA65GdDkFJTqZv4AYNDV1tvloaIOGbaIxo",
  authDomain: "insightblog-86515.firebaseapp.com",
  projectId: "insightblog-86515",
  storageBucket: "insightblog-86515.appspot.com",
  messagingSenderId: "170706556179",
  appId: "1:170706556179:web:1150e6aafbc0d5eadcb6e6",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const firestore = app.firestore();
const database = {
  users: firestore.collection("users"),
  articles: firestore.collection("articles"),
  counter: firestore.collection("counter"),
  formatDocument: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
};

export { auth, database };
