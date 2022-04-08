import styles from "./ReservationCard.module.css";
// import Calendar from 'react-calendar'
import { useState } from "react";

export const ReservationCard = () => {
    const today = new Date().toISOString();
    console.log(today)
    const formatDate = today.substring(0,today.length-1)
    console.log(formatDate)
    const dateTimeLocal = formatDate.slice(0, 16)
    console.log(dateTimeLocal)
    const reservationTime = formatDate.slice(11, 13)
    console.log(reservationTime)
    const futureTime = parseInt(reservationTime)+2
    console.log(futureTime)


    const [date, setDate] = useState(dateTimeLocal)
    // const [time, setTime] = useState()
    const [people, setPeople] = useState(1)

    console.log(formatDate)

    const handleSubmit = (e) => {
        e.preventDefaul();

    }
    return (
        <div className={styles.card}>
            <form onSubmit={handleSubmit}>
                <div><strong>Make a reservation</strong></div>
                <div>
                    <p><strong>*Party Size (required)</strong></p>
                    <p>If you're party has more than 10 people, please call the restaurant.</p>
                    <select value={people} onChange={(e) => setPeople(e.target.value)}>
                        <option value="1">-- Select number of people --</option>
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
                    <label htmlFor="datetime">Select a date and time:</label>
                    <input type="datetime-local" name="datetime" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <button type="submit">Reserve table</button>
            </form>
        </div>
    )
}
