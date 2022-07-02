import {auth} from './config';
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, User, updateEmail} from 'firebase/auth';
import { createUserDoc } from './documents';
import {FirebaseError} from '@firebase/util';
import { AppMessageContext } from '../models/AppMessage';

export const signup = async (name:string, phone:string, email:string, password:string, appMessageCtx: AppMessageContext | null) => {
    try {
        const {user}= await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user,{displayName: name});
        //console.log("succesfully created", user);
        await createUserDoc(user, {displayName: name, phone: phone}, appMessageCtx);
        appMessageCtx?.setMessage({severity: 'success', message: `user ${name} succesfully created`});
        return true;
    } catch (err:unknown) {
        if (err instanceof FirebaseError) {
            if (err.code==='auth/email-already-in-use') {
                logIn(email, password, appMessageCtx); 
            };
            console.error(err.code);
            appMessageCtx?.setMessage({severity: 'error', message: `error creating user, ${err.message}`});
        }
        return false;
    } 
}

export const updateUserName = async (user: User, name: string, appMessageCtx: AppMessageContext | null) => {
    try {
        await updateProfile(user, {displayName: name});
        console.log("Name succesfully updated", name);
        appMessageCtx?.setMessage({severity: 'success', message: `user ${name} succesfully updated`});
    } catch (err:unknown) {
        console.error(err);
        appMessageCtx?.setMessage({severity: 'error', message: `error updating user, ${err}`});
    }
}

export const updatePhotoURL = async (user: User, url: string, appMessageCtx: AppMessageContext | null) => {
    try {
        await updateProfile(user, {photoURL: url});
        console.log("Photo succesfully updated");
        appMessageCtx?.setMessage({severity: 'success', message: `user photo succesfully updated`});
    } catch (err:unknown) {
        console.error(err);
        appMessageCtx?.setMessage({severity: 'error', message: `error updating user photo, ${err}`});
    }
}

export const updateUserEmail = async (user: User, email: string, appMessageCtx: AppMessageContext | null) => {
    if (user.email){
        try {
            await updateEmail(user, email);
            console.log("Email succesfully updated", email);
            appMessageCtx?.setMessage({severity: 'success', message: `user ${email} succesfully updated`});
        } catch (err:unknown) {
            console.error(err);
            appMessageCtx?.setMessage({severity: 'error', message: `error updating user email, ${err}`});
        }
    }
}

export const logout= async (appMessageCtx: AppMessageContext | null)=>{
    try {
        await signOut(auth);
        console.log("succesfully logout");
        appMessageCtx?.setMessage({severity: 'success', message: 'succesfully logout'});
        return true;
    } catch (error) {
        console.error(error);
        appMessageCtx?.setMessage({severity: 'error', message: `${error}`});
        return false;
    }
};

export const logIn= async (email:string, password: string, appMessageCtx: AppMessageContext | null)=>{
    try {
        const {user}= await signInWithEmailAndPassword(auth, email, password);
        //console.log("succesfully logined", user);
        appMessageCtx?.setMessage({severity: 'success', message: `${user.displayName} succesfully logined`});
        return true;
    } catch (error) {
        console.error(error);
        appMessageCtx?.setMessage({severity: 'error', message: `${error}`});
        return false;
    }
};

export const resetPassword = async (email: string, appMessageCtx: AppMessageContext | null) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("message succesfully sent to ", email);
        appMessageCtx?.setMessage({severity: 'success', message: `message succesfully sent to ${email}`});
        return true;
    } catch (error) {
        console.error(error);
        appMessageCtx?.setMessage({severity: 'error', message: `${error}`});
        return false;
    }
}