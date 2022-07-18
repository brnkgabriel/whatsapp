
import {
  getFirestore,
  doc, setDoc,
  getDoc, collection,
  serverTimestamp,
  addDoc, where, query
} from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDs-RfE-cTL8t1VS10ClJBwnWvEANNVoRI",
  authDomain: "coding-test-projects.firebaseapp.com",
  projectId: "coding-test-projects",
  storageBucket: "coding-test-projects.appspot.com",
  messagingSenderId: "821726697831",
  appId: "1:821726697831:web:66ea09329964ee9120f7c2",
  measurementId: "G-3LP12W6G27"
}


const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {
  db, doc, setDoc, getDoc, serverTimestamp, addDoc, collection, where, query,
  auth, provider, signInWithPopup, GoogleAuthProvider
}