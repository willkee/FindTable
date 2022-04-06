import { useEffect, useState } from "react";
import { Calendar } from "../Icons";
import styles from './Calendar.module.css'

const CalendarDropdown = () => {
    const [showBox, setShowBox] = useState(false)

    const openBox = () => setShowBox(!showBox)

    useEffect(() => {
        if (!showBox) return;

        const closeBox = () => setShowBox(false);
        document.addEventListener("click", closeBox)

        return () => document.removeEventListener("click", closeBox)
    })

    return (
        <div className={styles.calendarOuterContainer}>
            <div className={styles.calendarIconContainer} onClick={openBox}>
                <Calendar />
            </div>
            {showBox && (
                <div id="calendar_dropdown" className={styles.dropdown} onClick={e => e.stopPropagation()}>
                    <h5>Upcoming Reservations</h5>
                    <p>You have no upcoming reservations.</p>
                </div>
            )}
        </div>
    )
}

export default CalendarDropdown