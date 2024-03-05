import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "firebase/auth";
import useShowToast from "./useShowToast";

const useLogout = () => {

    const [signOut, isLoadingOut, error] = useSignOut(auth);
    const showToast = useShowToast();

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('user-info');
            console.log("Logged Out");
        } catch (error) {
            showToast("Error", error.message, 'error');
        }
    }


    return { handleLogout, isLoadingOut, error };
};

export default useLogout;