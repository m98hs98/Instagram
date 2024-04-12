import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyCo5YwbTXe5vIfuD2ijJfdgcQpgyfyw7Vg",
//   authDomain: "instagram-clone-1518c.firebaseapp.com",
//   projectId: "instagram-clone-1518c",
//   storageBucket: "instagram-clone-1518c.appspot.com",
//   messagingSenderId: "746835937508",
//   appId: "1:746835937508:web:e2d340ded858e341ed04f1",
//   measurementId: "G-V2K9KQFWG9"
// };


const firebaseConfig = {
  apiKey: "AIzaSyBdLf5kVHHEla049Ty_h2OE09Qpc3WFXYk",
  authDomain: "instagram-dev-mahsa.firebaseapp.com",
  projectId: "instagram-dev-mahsa",
  storageBucket: "instagram-dev-mahsa.appspot.com",
  messagingSenderId: "926164822839",
  appId: "1:926164822839:web:6f4d9cb40a43fd1e2d48b2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);



export { app, auth, firestore, storage };