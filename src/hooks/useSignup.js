import React, { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

function useSignup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const [isCancelled, setIsCancelled] = useState(false);

  async function signup(email, password, displayName) {
    setError(null);
    setLoading(true);
    try {
      const response = await projectAuth.createUserWithEmailAndPassword(email, password);

      if (!response) {
        throw new Error("Could not complete signup");
      }

      // adding name of the user
      await response.user.updateProfile({ displayName });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: response.user })
      if (!isCancelled) {
        setLoading(false);
        setError(null);
      }

    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, [])

  return { error, loading, signup };
}

export default useSignup
