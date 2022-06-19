import {db} from './config';
import { setDoc, doc, getDoc, collection, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import {User} from 'firebase/auth';
import { Booking, BookingDoc } from '../models/Booking';
import { AppMessageContext } from '../models/AppMessage';
import { Vacancy } from '../models/Vacancy';
import { format } from 'date-fns';
import { AppUser } from '../models/User';
import { sendNotification } from '../telegram/api';
import { Post } from '../models/Post';

export const createUserDoc= async (user:User, data:any, appMessageCtx: AppMessageContext | null)=>{
    if (!user) return false;
    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) {
        const createdAt=new Date();
        const {displayName, email, photoURL}=user;
        try {
            await setDoc(doc(db, "users", user.uid),{
                displayName, email, photoURL, createdAt, ...data
            });
            console.log("Document written with ID: ", user.uid);
            appMessageCtx?.setMessage({severity: 'success', message: `user ${displayName} succesfully created`});
            return true;
        } catch (e) {
            console.error('error creating user, ', e);
            appMessageCtx?.setMessage({severity: 'error', message: `error creating user, ${e}`});
            return false;
        }
    };
};
export const updateUserDoc= async (user:User, data:any, appMessageCtx: AppMessageContext | null)=>{
    if (!user) return false;
    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
        try {
            await setDoc(doc(db, "users", user.uid),{
                ...data
            }, { merge: true });
            console.log("Document written with ID: ", user.uid);
            appMessageCtx?.setMessage({severity: 'success', message: `user ${user.displayName} succesfully updated`});
            return true;
        } catch (e) {
            console.error('error updating user, ', e);
            appMessageCtx?.setMessage({severity: 'error', message: `error updating user, ${e}`});
            return false;
        }
    } else {
        createUserDoc(user, data, appMessageCtx);
    };
};

export const getUserDoc= async (uid:string, appMessageCtx: AppMessageContext | null)=> {
    if (!uid) return null;
    try {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        return {uid, ...docSnap.data()} as AppUser;
    } catch (error) {
        console.error ('error fetching user, ', error);
        appMessageCtx?.setMessage({severity: 'error', message: `error fetching user, ${error}`});
    };
};

export const createBookingDoc= async (book:Booking, appMessageCtx: AppMessageContext | null)=>{
    if (!book || ! book.user) return false;
    const userRef = doc(db, "users", book.user.uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
        const createdAt=new Date();
        const {displayName, phone, email}=book.user;
        const {address, service, date, hour} = book;
        try {
            await setDoc(doc(db, "bookings", book.id),{
                displayName, phone, email, createdAt, address, service, date, hour, status: 'active'
            });
                console.log("Document written with ID: ", book.id);
            appMessageCtx?.setMessage({severity: 'success', message: `booking on ${date} ${hour} succesfully created`});
            await sendNotification(`New booking: \n
                Name: ${displayName}, \nEmail: ${email}, \nPhone: ${phone},
                 \nService: ${service}, \nAddress: ${address}, \nDate: ${date}, \nHour: ${hour}`, appMessageCtx);
            return true;
        } catch (e) {
            console.error('error creating booking, ', e);
            appMessageCtx?.setMessage({severity: 'error', message: `error creating booking, ${e}`});
            return false;
        }
    } else {
        console.error('error creating booking, user does not exist');
        appMessageCtx?.setMessage({severity: 'error', message: `error creating booking, user does not exist`});
        return false;
    }
};

export const getBookings= async (appMessageCtx: AppMessageContext | null)=> {
    try {
        const bookingsRef = collection(db, "bookings");
        const querySnapshot = await getDocs(bookingsRef);
        if (!querySnapshot.empty){
            const result = [] as any;
            querySnapshot.forEach(d => {
                result.push({id: d.id, ...d.data()});
            })
            return result as BookingDoc[];
        } else {
            appMessageCtx?.setMessage({severity: 'error', message: `no bookings were found`});
            return null;
        }      
    } catch (error) {
        console.error ('error fetching bookings, ', error);
        appMessageCtx?.setMessage({severity: 'error', message: `error fetching bookings, ${error}`});
    };
};

export const getBookingsByDate= async (date:Date, appMessageCtx: AppMessageContext | null)=> {
    if (!date) return null;
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("date", "==", format(date, 'dd/MM/yyyy')));
    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty){
            const result = [] as any;
            querySnapshot.forEach(d => {
                result.push({id: d.id, ...d.data()});
            })
            return result as BookingDoc[];
        } else {
            appMessageCtx?.setMessage({severity: 'error', message: `no bookings were found for the day, ${date.toLocaleDateString()}`});
            return null;
        }      
    } catch (error) {
        console.error ('error fetching bookings, ', error);
        appMessageCtx?.setMessage({severity: 'error', message: `error fetching bookings, ${error}`});
    };
};

export const getBookingsByEmail= async (email:string, appMessageCtx: AppMessageContext | null)=> {
    if (!email) return null;
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("email", "==", email));
    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty){
            const result = [] as any;
            querySnapshot.forEach(d => {
                result.push({id: d.id, ...d.data()});
            })
            return result as BookingDoc[];
        } else {
            appMessageCtx?.setMessage({severity: 'error', message: `no bookings were found for the email, ${email}`});
            return null;
        }      
    } catch (error) {
        console.error ('error fetching bookings, ', error);
        appMessageCtx?.setMessage({severity: 'error', message: `error fetching bookings, ${error}`});
    };
};

export const setBookingStatus= async (book:BookingDoc, status: string, appMessageCtx: AppMessageContext | null)=>{
    if (!book || (status === book.status)) return;
    const bookingRef = doc(db, "bookings", book.id);
    const snapshot = await getDoc(bookingRef);
    if (snapshot.exists()) {
        try {
            await setDoc(bookingRef, {status}, { merge: true });
                console.log("Document's status written for booking with ID: ", book.id);
            appMessageCtx?.setMessage({severity: 'success', message: `booking's status succesfully updated`});
            await sendNotification(`Booking status changed to ${status}: 
                \nName: ${book.displayName}, \nEmail: ${book.email}, \nPhone: ${book.phone},
                 \nService: ${book.service}, \nAddress: ${book.address}, \nDate: ${book.date}, \nHour: ${book.hour}`, appMessageCtx);
        } catch (e) {
            console.error(`error updating booking's status, `, e);
            appMessageCtx?.setMessage({severity: 'error', message: `error updating booking, ${e}`});
        }
    } else {
        console.error('error updating booking, booking does not exist');
        appMessageCtx?.setMessage({severity: 'error', message: `error updating booking, booking does not exist`});
    }
};

export const createVacancyDoc= async (vacancy:Vacancy, appMessageCtx: AppMessageContext | null)=>{
    if (!vacancy) return;
    const createdAt=new Date();
    const {date, hours} = vacancy;
    if (hours.length === 0) {
        const vacanciesRef = collection(db, "vacancies");
        const q = query(vacanciesRef, where("date", "==", date));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty){
            deleteVacancyDoc(vacancy, appMessageCtx);
        }
    } 
        try {
            await setDoc(doc(db, "vacancies", vacancy.id),{
                createdAt, date, hours
            });
                console.log("Document written with ID: ", vacancy.id);
            appMessageCtx?.setMessage({severity: 'success', message: `vacancy on ${date} succesfully created`});
        } catch (e) {
            console.error('error creating vacancy, ', e);
            appMessageCtx?.setMessage({severity: 'error', message: `error creating vacancy, ${e}`});
        }
};

export const getVacancies= async (appMessageCtx: AppMessageContext | null)=> {
    try {
        const vacanciesRef = collection(db, "vacancies");
        const querySnapshot = await getDocs(vacanciesRef);
        if (!querySnapshot.empty){
            const result = [] as any;
            querySnapshot.forEach(d => {
                result.push({id: d.id, ...d.data()});
            })
            return result as Vacancy[];
        } else {
            appMessageCtx?.setMessage({severity: 'error', message: `no vacancies were found`});
            return null;
        }      
    } catch (error) {
        console.error ('error fetching vacancies, ', error);
        appMessageCtx?.setMessage({severity: 'error', message: `error fetching vacancies, ${error}`});
    };
};

export const getVacancyByDate= async (date:string, appMessageCtx: AppMessageContext | null)=> {
    if (!date) return null;
    const vacanciesRef = collection(db, "vacancies");
    const q = query(vacanciesRef, where("date", "==", date));
    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty){
            return {id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data()} as Vacancy;
        } else {
            appMessageCtx?.setMessage({severity: 'error', message: `no vacancies were found for the day, ${date}`});
            return null;
        }      
    } catch (error) {
        console.error ('error fetching vacancies, ', error);
        appMessageCtx?.setMessage({severity: 'error', message: `error fetching vacancies, ${error}`});
        return null;
    };
};

export const deleteVacancyDoc= async (vacancy:Vacancy, appMessageCtx: AppMessageContext | null)=>{
    if (!vacancy) return;
        try {
            await deleteDoc(doc(db, "vacancies", vacancy.id));
                console.log("Document deleted with ID: ", vacancy.id);
            appMessageCtx?.setMessage({severity: 'success', message: `vacancy on ${vacancy.date} succesfully deleted`});
        } catch (e) {
            console.error('error deleting vacancy, ', e);
            appMessageCtx?.setMessage({severity: 'error', message: `error deleting vacancy, ${e}`});
        }
};

export const createPostDoc= async (post:Post, appMessageCtx: AppMessageContext | null)=>{
    if (!post || ! post.author) return false;
    const userRef = doc(db, "users", post.author.uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
        const createdAt=new Date();
        const {uid, displayName, photoURL}=post.author;
        const author = {uid, displayName, photoURL};
        const {date, title, enTitle, content, enContent, likes} = post;
        try {
            await setDoc(doc(db, "news", post.id),{
                author, createdAt, date, title, enTitle, content, enContent, likes
            });
                console.log("Document written with ID: ", post.id);
            appMessageCtx?.setMessage({severity: 'success', message: `post by ${displayName} succesfully created`});
            return true;
        } catch (e) {
            console.error('error creating post, ', e);
            appMessageCtx?.setMessage({severity: 'error', message: `error creating post, ${e}`});
            return false;
        }
    } else {
        console.error('error creating post, author does not exist');
        appMessageCtx?.setMessage({severity: 'error', message: `error creating post, author does not exist`});
        return false;
    }
};

export const getPosts= async (appMessageCtx: AppMessageContext | null)=> {
    try {
        const newsRef = collection(db, "news");
        const querySnapshot = await getDocs(newsRef);
        if (!querySnapshot.empty){
            const result = [] as any;
            querySnapshot.forEach(d => {
                result.push({id: d.id, ...d.data()});
            })
            return result as Post[];
        } else {
            appMessageCtx?.setMessage({severity: 'error', message: `no posts were found`});
            return null;
        }      
    } catch (error) {
        console.error ('error fetching posts, ', error);
        appMessageCtx?.setMessage({severity: 'error', message: `error fetching posts, ${error}`});
    };
};

export const updateLikeToPostDoc= async (post:Post)=>{
    if (!post) return;
    const {id, likes} = post; 
        try {
            await updateDoc(doc(db, "news", id), "likes", likes);
                console.log("Document updated with ID: ", id);
        } catch (e) {
            console.error('error updating post, ', e);
        }
};

export const deletePostDoc= async (post:Post, appMessageCtx: AppMessageContext | null)=>{
    if (!post) return;
        try {
            await deleteDoc(doc(db, "news", post.id));
                console.log("Document deleted with ID: ", post.id);
            appMessageCtx?.setMessage({severity: 'success', message: `post by ${post.author.displayName} succesfully deleted`});
        } catch (e) {
            console.error('error deleting post, ', e);
            appMessageCtx?.setMessage({severity: 'error', message: `error deleting post, ${e}`});
        }
};