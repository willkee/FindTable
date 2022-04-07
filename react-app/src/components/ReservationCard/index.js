import styles from "./ReservationCard.module.css";
import Calendar from 'react-calendar'

export const ReservationCard = () => {
    return (
        <div className={styles.card}>
            <div><strong>Make a reservation</strong></div>
            <div>
                <p><strong>Party Size</strong></p>
                <select>
                    <option></option>
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
