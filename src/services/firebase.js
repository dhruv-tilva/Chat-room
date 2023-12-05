import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';
import { setToken, setUser } from '../utils';

const firebaseConfig = {
    apiKey: "AIzaSyCGQLVWf6I2XyaL8xd_J4vkWDefCf-oQTg",
    authDomain: "chat-room-8675a.firebaseapp.com",
    projectId: "chat-room-8675a",
    storageBucket: "chat-room-8675a.appspot.com",
    messagingSenderId: "196790192605",
    appId: "1:196790192605:web:77535cc0870f2f3a738e34",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);
        setUser(user)
        setToken(user.accessToken);

        return { uid: user.uid, displayName: user.displayName, photoURl: user.photoURL };
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }
        return null;
    }
    // window.location.reload();
}

async function sendMessage(roomId, user, text) {
    try {
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
}

function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((x) => ({
                id: x.id,
                ...x.data(),
            }));

            callback(messages);
        }
    );
}

export { loginWithGoogle, sendMessage, getMessages };
