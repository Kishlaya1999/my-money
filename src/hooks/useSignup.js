import React, { useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

function useSignup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

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
      dispatch({type: "LOGIN", payload: response.user})

      setLoading(false);
      setError(null);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return { error, loading, signup };
}

export default useSignup
