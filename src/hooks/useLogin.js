import { useState } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setLoading(true);

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // dispatch action for logout so that user can be set as `null`
            dispatch({ type: "LOGIN", payload: res.user });
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { error, loading, login };
}

export { useLogin };