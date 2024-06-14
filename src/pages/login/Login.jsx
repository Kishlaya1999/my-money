/** @format */

import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

// styles
import styles from "./Login.module.css";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, error, loading } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<form onSubmit={handleSubmit} className={styles["login-form"]}>
			<h2>login</h2>
			<label>
				<span>email:</span>
				<input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
			</label>
			<label>
				<span>password:</span>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</label>
			<button className="btn" disabled={loading && true}>
				{loading ? "Logging In..." : "Login"}
			</button>
			{error && <span>{error}</span>}
		</form>
	);
}
