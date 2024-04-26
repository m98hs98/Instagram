import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../Store/authStore";

const useLogout = () => {

    const [signOut, isLoadingOut, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logoutUser = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('user-info');
            logoutUser();
        } catch (error) {
            showToast("Error", error.message, 'error');
        }
    };


    return { handleLogout, isLoadingOut, error };
};

export default useLogout;