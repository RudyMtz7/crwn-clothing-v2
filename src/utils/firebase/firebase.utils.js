// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg6hvwdVGGkXoKdK-rHqUVJAk_4SVZclQ",
  authDomain: "crwn-clothing-db-224ae.firebaseapp.com",
  projectId: "crwn-clothing-db-224ae",
  storageBucket: "crwn-clothing-db-224ae.appspot.com",
  messagingSenderId: "320856558648",
  appId: "1:320856558648:web:1f6d564101200fdd58aacd"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);