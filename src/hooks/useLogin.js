import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    // For Example we start logging in and then navigate away form the page where we are logging then we will get the response on the page which is already unmounted which will give error. So to overcome that error we need a clean up function
    const [isCancelled, setIsCancelled] = useState(false);

    const login = async (email, password) => {
        setError(null);
        setLoading(true);

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // dispatch action for logout so that user can be set as `null`
            dispatch({ type: "LOGIN", payload: res.user });

            if (!isCancelled) {
                setLoading(false);
                setError(null);
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

    return { error, loading, login };
}

export { useLogin };