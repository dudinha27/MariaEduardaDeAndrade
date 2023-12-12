
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyADe6170JXOat39V24W9hbPhwxg5lbVy20",
  authDomain: "mariaeduarda-fe63e.firebaseapp.com",
  projectId: "mariaeduarda-fe63e",
  storageBucket: "mariaeduarda-fe63e.appspot.com",
  messagingSenderId: "679427810298",
  appId: "1:679427810298:web:db6ffc29be37a2ebe3ba43",
  measurementId: "G-K7GHCDBLR5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);