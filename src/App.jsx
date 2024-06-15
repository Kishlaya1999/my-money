/** @format */

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// pages & components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/SignUp";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
	const { user, authIsReady } = useAuthContext();
	console.log(user, authIsReady);
	return (
		<div className="App">
			{authIsReady && (
				<BrowserRouter>
					<Navbar />
					<Switch>
						{/* If the application doesn't get "user" object from firebase then we redirect user to signup page and user can't access home page without signup */}
						{/* If we get "user" object from firebase then we redirect user to Home and user can't access signup or login page*/}
						<Route exact path="/">
							{user ? <Home /> : <Redirect to="/signup" />}
						</Route>
						<Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
						<Route path="/signup">
							{user ? <Redirect to="/" /> : <Signup />}
						</Route>
					</Switch>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
