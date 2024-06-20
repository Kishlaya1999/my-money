import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const [isCancelled, setIsCancelled] = useState(false);

    const logout = async () => {
        setError(null);
        setLoading(true);

        try {
            await projectAuth.signOut();

            // dispatch action for logout so that user can be set as `null`
            dispatch({ type: "LOGOUT" });

            if (!isCancelled) {
                setError(null);
                setLoading(false);
            }

        } catch (error) {
            if (!isCancelled) {
                console.log(error.message);
                setError(error.message);
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { error, loading, logout };
}

export { useLogout };