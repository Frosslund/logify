import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { get } from './api';
import { fetchUser } from '../slices/userSlice';
import { db } from './firebaseConfig';
import { syncUser } from '../slices/userDataSlice';

const { REACT_APP_BASE_URL } = process.env;

export const HandleUser = () => {

    const getUserInfo = async () => {
        try {
            const data = await get(REACT_APP_BASE_URL + '/me');
            return data;
        } catch (err) {
            console.log(err)
        }
         
    }  

    const getUserData = async (user) => {
        try {
            let docRef = db.collection('users').doc(user.id);
            return await docRef.get();
        } catch(err) {
            console.log(err)
        }  
    }

    const setUser = async (user) => {
        try {
            let usersRef = db.collection('users');
            await usersRef.doc(user.id).set({
                name: user.display_name,
                lists: [],
                wishlist: [],
                logs: []
            });  
        } catch(err) {
            console.log(err)
        }  
    }

    const dispatch = useDispatch();

    const user = async () => await get(REACT_APP_BASE_URL + '/me');
    //const user = getUserInfo();
    dispatch(fetchUser(user()));
        
/*         console.log(user.id)
        //dispatch(fetchUser(user));
        const userData = getUserData(user);
        if (userData.exists) {
            dispatch(syncUser(userData.data()))
        }
        else {
            setUser(user)
        } */
}