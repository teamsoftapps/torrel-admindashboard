import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZ_LCKB9jTEYtflcqk-QA_9CjStQrX9kk",
  authDomain: "torrel-invoice-app.firebaseapp.com",
  projectId: "torrel-invoice-app",
  storageBucket: "torrel-invoice-app.appspot.com",
  messagingSenderId: "422540165637",
  appId: "1:422540165637:web:f4ddca6d87862b6820926c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default firebase;
