import { useDispatch } from 'react-redux';

import { get } from './api';
import { fetchUser } from '../slices/userSlice';
import { db } from './firebaseConfig';
import { syncLog } from '../slices/logSlice';
import { syncLists } from '../slices/listSlice';
import { syncAlbum } from '../slices/albumSlice';

const { REACT_APP_BASE_URL } = process.env;

export const HandleUser = () => {
    const dispatch = useDispatch();

    const getUserInfo = async () => {
        try {
            const user = await get(REACT_APP_BASE_URL + '/me');
            dispatch(fetchUser(user));
            let docRef = db.collection('users').doc(user.id);
            let doc = await docRef.get();
            if (doc.exists) {
                // add syncList, syncWishlist when ready
                dispatch(syncLog(doc.data()));
                dispatch(syncLists(doc.data()));
                dispatch(syncAlbum(doc.data()))
            } else {
                setUser(user)
            }
        } catch (err) {
            console.log(err)
        }
         
    }  

/*     const getUserData = async (user) => {
        console.log(user)
        try {
            let docRef = db.collection('users').doc(user.id);
            let doc = await docRef.get();
            if (doc.exists) {
                console.log("hej")
                dispatch(syncUser(doc.data()));
            } else {
                setUser(user)
            }
        } catch(err) {
            console.log(err)
        }  
    } */

    const setUser = async (user) => {
        try {
            let usersRef = db.collection('users');
            await usersRef.doc(user.id).set({
                name: user.display_name,
                lists: [],
                wishlist: [],
                currenList: {},
                logs: [],
                album: {}
            });  
        } catch(err) {
            console.log(err)
        }  
    }

    getUserInfo();
    
}