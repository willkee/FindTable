import styles from "./ReservationCard.module.css";
import Calendar from 'react-calendar'
import { useState } from "react";

export const ReservationCard = () => {
    const [date, setDate] = useState(new Date())
    return (
        <div className={styles.card}>
            <div><strong>Make a reservation</strong></div>
            <div>
                <p><strong>Party Size</strong></p>
                <select>
                    <option value={1}>1 person</option>
                    <option value={2}>2 people</option>
                    <option value={3}>3 people</option>
                    <option value={4}>4 people</option>
                    <option value={5}>5 people</option>
                    <option value={6}>6 people</option>
                    <option value={7}>7 people</option>
                    <option value={8}>8 people</option>
                    <option value={9}>9 people</option>
                    <option value={10}>10 people</option>
                </select>
            </div>
            <div>
                <p><strong>Date</strong></p>
                <div className={styles.calendar} onClick={e => e.stopPropagation()}>
                    <Calendar minDate={new Date()} onChange={(e) => setDate(e)} value={date}/>
                </div>
            </div>
            <div>
                <p><strong>Select a time:</strong></p>
                <div role="button"></div>
            </div>
        </div>
    )
}
