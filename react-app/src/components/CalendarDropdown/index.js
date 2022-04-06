import { useEffect, useState } from "react";
import { CalendarIcon } from "../Icons";
import styles from './Calendar.module.css'

const CalendarIconDropdown = () => {
    const [showBox, setShowBox] = useState(false)

    const openBox = () => setShowBox(!showBox)

    useEffect(() => {
        if (!showBox) return;

        const closeBox = () => setShowBox(false);
        document.addEventListener("click", closeBox)

        return () => document.removeEventListener("click", closeBox)
    })

    return (
        <div className={styles.CalendarIconOuterContainer}>
            <div className={styles.CalendarIconIconContainer} onClick={openBox}>
                <CalendarIcon />
            </div>
            {showBox && (
                <div id="CalendarIcon_dropdown" className={styles.dropdown} onClick={e => e.stopPropagation()}>
                    <h5>Upcoming Reservations</h5>
                    <p>You have no upcoming reservations.</p>
                </div>
            )}
        </div>
    )
}

export default CalendarIconDropdown
