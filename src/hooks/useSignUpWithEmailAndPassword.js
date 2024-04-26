import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../Store/authStore';

const useSignUpWithEmailAndPassword = () => {
  
    const [
        createUserWithEmailAndPassword,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
   

    const signup = async (inputs) => {

        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
            showToast("Error", "Please fill all the fields", "error");
            return;
        }

        // Avoid repetitive username
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("username", "==", inputs.username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            showToast("Error", "Username already exists", "error");
            return;
        }


        try {
            console.log("Attempting to create user with email:", inputs.email);
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            
            if(!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }

            if (newUser) {
                console.log("User authenticated:", !!auth.currentUser);

                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullName: inputs.fullName,
                    bio: "",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };


                console.log("Attempting to write to Firestore with user UID:", newUser.user.uid);

                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc); // User has been create in the database 
                localStorage.setItem("user-info", JSON.stringify(userDoc)); // Set the previous line in our local storage
                loginUser(userDoc);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { loading, error, signup };

};

export default useSignUpWithEmailAndPassword;