import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserProfileIcon } from "../Icons";
import styles from "./ProfileDropdown.module.css";
import LogoutButton from "../LogoutButton";
import { useHistory } from "react-router-dom";

const Profile = () => {
	const history = useHistory();
	const [showBox, setShowBox] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);

	const openBox = () => setShowBox(!showBox);

	useEffect(() => {
		if (!showBox) return;

		const closeBox = () => setShowBox(false);
		document.addEventListener("click", closeBox);

		return () => document.removeEventListener("click", closeBox);
	});

	const goToProfile = () => {
		history.push("/my-profile");
		setShowBox(false);
		return;
	};

	return (
		<div className={styles.profileOuterContainer}>
			<div className={styles.profileIconContainer} onClick={openBox}>
				<UserProfileIcon />
			</div>
			{showBox && (
				<div
					id="profile_dropdown"
					className={styles.dropdown}
					onClick={(e) => e.stopPropagation()}
				>
					<h3>Hello {sessionUser.first_name}!</h3>
					<div className={styles.profile_link} onClick={goToProfile}>
						My Profile
					</div>
					<LogoutButton />
				</div>
			)}
		</div>
	);
};

export default Profile;
