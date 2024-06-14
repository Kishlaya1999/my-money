/** @format */

import { Link } from "react-router-dom";

// styles
import styles from "./Navbar.module.css";
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
	const {logout} = useLogout();
	return (
		<nav className={styles.navbar}>
			<ul>
				<li className={styles.title}>myMoney</li>

				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/signup">Sign up</Link>
				</li>

				<li>
					<button className="btn" onClick={logout}>Log Out</button>
				</li>
			</ul>
		</nav>
	);
}
