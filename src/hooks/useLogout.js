import { useState } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setLoading(true);

        try {
            await projectAuth.signOut();

            // dispatch action for logout so that user can be set as `null`
            dispatch({ type: "LOGOUT" });
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { error, loading, logout };
}

export { useLogout };