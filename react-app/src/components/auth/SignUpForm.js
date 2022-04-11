import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { setCurrentModal, hideModal } from "../../store/modal";
import { login } from "../../store/session";
import LoginForm from "./LoginForm";
import styles from "./Auth.module.css";
import animation from "../../video/FindTable-loading.mp4";

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const dispatch = useDispatch();

	const loginDemo = async (e) => {
		e.preventDefault();
		const data = await dispatch(login("demo@user.com", "password"));
		if (data) return setErrors(data);
		dispatch(hideModal());
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(
			signUp(firstName, lastName, email, password, confirmPassword)
		);

		if (data) {
			return setErrors(data);
		}
		dispatch(hideModal());
	};

	const showLoginForm = () => {
		dispatch(setCurrentModal(LoginForm));
	};

	return (
		<div className={styles.parent}>
			{!errors.length ? (
				<video loop autoPlay width="250">
					<source src={animation} type="video/mp4" />
					Sorry, your browser doesn't support embedded videos.
				</video>
			) : (
				<video loop autoPlay width="150">
					<source src={animation} type="video/mp4" />
					Sorry, your browser doesn't support embedded videos.
				</video>
			)}
			<h4>Welcome to FindTable!</h4>
			{errors.length > 0 && (
				<div className={styles.error_container}>
					{errors.map((error, i) => (
						<div key={i}>{error.replace("_", " ")}</div>
					))}
				</div>
			)}
			<form className={styles.signup_form}>
				<div className={styles.fields}>
					<div>
						<label>First Name</label>
						<input
							type="text"
							name="firstName"
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
						></input>
					</div>
					<div>
						<label>Last Name</label>
						<input
							type="text"
							name="lastName"
							onChange={(e) => setLastName(e.target.value)}
							value={lastName}
						></input>
					</div>
					<div>
						<label>Email</label>
						<input
							type="text"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						></input>
					</div>
					<div>
						<label>Password</label>
						<input
							type="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="none"
							value={password}
						></input>
					</div>
					<div>
						<label>Confirm Password</label>
						<input
							type="password"
							name="confirmPassword"
							onChange={(e) => setConfirmPassword(e.target.value)}
							autoComplete="none"
							value={confirmPassword}
						></input>
					</div>
				</div>
				<div
					""
					className={styles.div_button}
					onClick={handleSubmit}
				>
					Sign Up
				</div>
				<div
					""
					className={styles.div_button}
					onClick={loginDemo}
				>
					Demo User
				</div>
				<div
					""
					className={styles.switch}
					onClick={showLoginForm}
				>
					Already signed up? Log in!
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
