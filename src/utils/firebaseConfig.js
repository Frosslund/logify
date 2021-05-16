import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { get } from './api';

import { syncUser } from '../slices/userDataSlice';

const { REACT_APP_BASE_URL } = process.env;

const firebaseConfig = {
    apiKey: "AIzaSyAB3QGizpH8x87dixIZhjgoip8-jFI6vtQ",
    authDomain: "logify-517a9.firebaseapp.com",
    projectId: "logify-517a9",
    storageBucket: "logify-517a9.appspot.com",
    messagingSenderId: "852947326101",
    appId: "1:852947326101:web:3125e43689265a50aa779c"
}

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();


const setUser = async (user) => {
    let usersRef = db.collection('users')
    await usersRef.doc(user.id).set({
        name: user.display_name,
        lists: [],
        wishlist: [],
        logs: []
    })   
}

export const checkUser = async (user) => {
    let docRef = db.collection('users').doc(user.id);
    let doc = await docRef.get();
    if (doc.exists) {
        //console.log(doc.data())
        syncUser(doc.data())
    } else {
        setUser(user)
    }
}

export const updateFirestoreState = async (payload) => {
    try {
        //console.log('updateFirestoreState', payload)
        const data = await get(REACT_APP_BASE_URL + '/me')
        let docRef = db.collection('users').doc(data.id)
        return docRef.update(payload)
    } catch (err) {
        console.error(err)
    }
}

export default firebase;
