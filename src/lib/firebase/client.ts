import { type Database, getDatabase } from 'firebase/database';
import { type FirebaseApp, initializeApp } from 'firebase/app';

// TODO: move this to .env file
const firebaseConfig = {
    apiKey: 'AIzaSyCmwpRzGyoeD-Xuh6Cuh1Agbsxw31Uekhk',
    authDomain: 'courseminder-dev.firebaseapp.com',
    databaseURL: 'https://courseminder-dev-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'courseminder-dev',
    storageBucket: 'courseminder-dev.appspot.com',
    messagingSenderId: '274860730108',
    appId: '1:274860730108:web:b7f706a51ee7a79dbd1979',
    measurementId: 'G-1T6H3BFHRR',
};

export let db: Database;
export let app: FirebaseApp;

export function initFirebase() {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
}
