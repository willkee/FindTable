import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { setCurrentModal, hideModal } from "../../store/modal";
import SignUpForm from "./SignUpForm";
import animation from "../../video/FindTable-loading.mp4";
import styles from "./Auth.module.css";

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const loginDemo = async (e) => {
		e.preventDefault();
		const data = await dispatch(login("demo@user.com", "password"));
		if (data) return setErrors(data);
		dispatch(hideModal());
	};

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			return setErrors(data);
		}
		dispatch(hideModal());
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const showSignUpForm = () => {
		dispatch(setCurrentModal(SignUpForm));
	};

	return (
		<div className={styles.parent}>
			<video loop autoPlay width="250">
				<source src={animation} type="video/mp4" />
				Sorry, your browser doesn't support embedded videos.
			</video>
			<h4>Welcome back! Please login.</h4>
			<form className={styles.form_element}>
				{errors.length > 0 && (
					<div className={styles.error_container}>
						{errors.map((error, i) => (
							<div key={i}>{error}</div>
						))}
					</div>
				)}
				<div className={styles.fields}>
					<div>
						<label htmlFor="email">Email</label>
						<input
							name="email"
							type="text"
							placeholder="Email"
							value={email}
							onChange={updateEmail}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							name="password"
							type="password"
							placeholder="Password"
							autoComplete="none"
							value={password}
							onChange={updatePassword}
						/>
					</div>
				</div>

				<div
					className={styles.div_button}
					onClick={onLogin}
				>
					Login
				</div>
				<div
					className={styles.div_button}
					onClick={loginDemo}
				>
					Demo User
				</div>
				<div
					className={styles.switch}
					onClick={showSignUpForm}
				>
					Don't have an account? Sign up!
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
