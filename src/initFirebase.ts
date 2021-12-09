import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA6Ay_IH59woMn5SG0vquMSfKPqp0-sdUo',
  authDomain: 'cem2-card-matching.firebaseapp.com',
  projectId: 'cem2-card-matching',
  storageBucket: 'cem2-card-matching.appspot.com',
  messagingSenderId: '6109055646',
  appId: '1:6109055646:web:dc373abe2d25e02e0dc98f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
