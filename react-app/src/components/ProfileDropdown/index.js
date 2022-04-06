import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserProfileIcon } from "../Icons";
import styles from './ProfileDropdown.module.css'
import LogoutButton from "../LogoutButton";

const Profile = () => {
    const [showBox, setShowBox] = useState(false)
    const sessionUser = useSelector(state => state.session.user)

    const openBox = () => setShowBox(!showBox)

    useEffect(() => {
        if (!showBox) return;

        const closeBox = () => setShowBox(false);
        document.addEventListener("click", closeBox)

        return () => document.removeEventListener("click", closeBox)
    })

    return (
        <div className={styles.profileOuterContainer}>
            <div className={styles.profileIconContainer} onClick={openBox}>
                <UserProfileIcon />
            </div>
            {showBox && (
                <div id="profile_dropdown" className={styles.dropdown} onClick={e => e.stopPropagation()}>
                    <h3>Hello {sessionUser.first_name}!</h3>
                    <button><a href="/my-profile">My Profile</a></button>
                    <LogoutButton />
                </div>
            )}
        </div>
    )
}

export default Profile
