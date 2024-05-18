// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// console.log(import.meta.env); //para ver las variables de entorno


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsDHc0S10EMV5tdqr91qwDF9Hf93Gq09Q",
    authDomain: "react-curso-2f528.firebaseapp.com",
    projectId: "react-curso-2f528",
    storageBucket: "react-curso-2f528.appspot.com",
    messagingSenderId: "1059238558745",
    appId: "1:1059238558745:web:d5d591506538a47d5a7e88"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp); //todas las funcionalidades de autenticacion
export const FirebaseDB = getFirestore(FirebaseApp); //configuracion de mi base de datos