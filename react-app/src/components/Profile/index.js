import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileIcon } from "../Icons";
import styles from './Profile.module.css'

const Profile = () => {
    const dispatch = useDispatch()
    const [showBox, setShowBox] = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    console.log(sessionUser.id, sessionUser.first_name, sessionUser.last_name, sessionUser.email, sessionUser.business_owner, sessionUser.restaurants)

    const openBox = () => setShowBox(!showBox)

    useEffect(() => {
        if (!showBox) return;

        const closeBox = () => setShowBox(false);
        document.addEventListener("click", closeBox)

        return () => document.removeEventListener("click", closeBox)

    })

    return (
        <>
            <div onClick={openBox}>
                <UserProfileIcon />
            </div>
            {showBox && (
                <div className={styles.dropdown}>
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Business Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{sessionUser.id}</td>
                                <td>{sessionUser.first_name}</td>
                                <td>{sessionUser.last_name}</td>
                                <td>{sessionUser.email}</td>
                                <td>{sessionUser.business_owner ? "Yes" : "No"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default Profile
