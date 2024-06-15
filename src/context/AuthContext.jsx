/** @format */

import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		case "AUTH_IS_READY":
			return { ...state, user: action.payload, authIsReady: true };
		default:
			return state;
	}
};

export const AuthContextPorvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		authIsReady: false,
	});

	// useReducer(reducerFunction, initialState)

	// Lesson 129 : Udemy
	useEffect(() => {
		// This function is going to run when we initially enter into our application. Based on our current authentication state i.e logged in or not . We would be redirected to the respective pages
		// Logged In ==> Home
		// Logged out ==> SignUp or Login Page
		// We only need to check the auth status initially
		projectAuth.onAuthStateChanged((user) => {
			// user logged in => user obj
			// user logged out => null
			// But whenever we run login or logout "AUTH_IS_READY" is going to dispatched we only want to dispatch it once in very beginning, for that firebase gives us as unsubscribe function which we need to invoke it for stopping it to run
			const unsub = dispatch({ type: "AUTH_IS_READY", payload: user });
			unsub();
		});
	}, []);

	console.log("AuthContext State", state);

	return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
