import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore,doc,setDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCKePFmBZMj0eulJFE8Q2hslrTh0n6t_qI",
  authDomain: "wallet-160eb.firebaseapp.com",
  projectId: "wallet-160eb",
  storageBucket: "wallet-160eb.appspot.com",
  messagingSenderId: "711006740401",
  appId: "1:711006740401:web:4711ec072aff5410626790",
  measurementId: "G-H2QRV19XHN"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {db,auth,provider,doc,setDoc};