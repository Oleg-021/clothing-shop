import {initializeApp} from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2woyOtIDi5sUHP_G81O-H0JJ9nFWTpb4",
    authDomain: "crown-clothing-db-cf1fc.firebaseapp.com",
    projectId: "crown-clothing-db-cf1fc",
    storageBucket: "crown-clothing-db-cf1fc.appspot.com",
    messagingSenderId: "826279679741",
    appId: "1:826279679741:web:50e8b15098b84208309094"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }

    return userDocRef;
}