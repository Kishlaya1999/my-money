/** @format */

import { Link } from "react-router-dom";

// styles
import styles from "./Navbar.module.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
	const { logout } = useLogout();
	const { user } = useAuthContext();
	return (
		<nav className={styles.navbar}>
			<ul>
				<li className={styles.title}>myMoney</li>

				{user ?
					<>
						<span>Hi, {user.displayName}</span>
						<li>
							<button className="btn" onClick={logout}>Log Out</button>
						</li>
					</>
					:
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Sign up</Link>
						</li>
					</>
				}



			</ul>
		</nav>
	);
}
