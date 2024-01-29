import {initializeApp, getApps, getApp} from "firebase/app";
import  {getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAxanSNwqJ8lyaeeqCCGY4KyaoG7n3rffw",
    authDomain: "next-ecomerce-en-linea.firebaseapp.com",
    projectId: "next-ecomerce-en-linea",
    storageBucket: "next-ecomerce-en-linea.appspot.com",
    messagingSenderId: "739384182976",
    appId: "1:739384182976:web:e5474a5b32da75ef594525",
    measurementId: "G-T4050KMSE0"
  };

  let app;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  const db = getFirestore(app);

  export default db;

  




   