import { useEffect, useState } from "react";
import { CalendarIcon } from "../Icons";
import styles from './Calendar.module.css'
import { ReservationNav } from "../Reservations/ReservationNav";

const CalendarIconDropdown = ({ reservationsArr }) => {
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
                <CalendarIcon />
            </div>
            {showBox && (
                <ReservationNav />
            )}
        </div>
    )
}

export default CalendarIconDropdown
