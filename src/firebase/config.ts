import { initializeApp, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const app = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BACKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
});

export const config = () => {
    console.log(getApp().options);
}

//make auth and firestore references
const auth=getAuth(app);
const db=getFirestore(app);

export {auth, db};