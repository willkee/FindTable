import styles from "./ReservationForm.module.css";
// import Calendar from 'react-calendar'
import { useState } from "react";
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../store/restaurants";

export const ReservationForm = ({restaurantId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [time, setTime] = useState("")
    const [people, setPeople] = useState(1)
    const [errors, setErrors] = useState([])

    const localString = new Date().toLocaleDateString() //4/8/2022
    const todayInput = localString.replaceAll('/', '-')
    console.log(todayInput)
    const todaysDate = new Date(); //Fri Apr 08 2022 17:23:40 GMT-0600 (Mountain Daylight Time)
    const todaysString = todaysDate.toDateString(); //Fri Apr 08 2022
    const thisYear = todaysDate.getFullYear(); //2022
    const thisMonth = todaysDate.getMonth() + 1; // 3 (because it's 0-23 so add 1 and you get April)
    const hour = todaysDate.getHours(); //17
    const minute = todaysDate.getMinutes(); //25
    const today = todaysDate.getDate(); //8
    const dateThing = new Date().toISOString().slice(0, 10)

    console.log(thisMonth)
    const input = "0"+thisMonth.toString()+"-"+"0"+""

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)

        const reservationData = {
            restaurant_id: restaurantId,
            num_people: people,
            date: date,
            time: time
        }

        const newReservation = await dispatch(createReservation(reservationData));

        if(newReservation.error) {
            setErrors(newReservation.error)
        } else {
            history.push('/my-profile')
            // history.push(`/my_reservations/${newReservation.id}`)
        }
    }

    return (
            <form className={styles.form} onSubmit={handleSubmit}>
                <ul>{errors && errors.map(error => (<li>{error}</li>))}</ul>
                <strong className={styles.title}>Make a reservation</strong>
                <hr></hr>
                <div className={styles.party}>
                    <strong>Party Size</strong>
                    <p>If you're party has more than 10 people, please call the restaurant.</p>
                    <select value={people} onChange={(e) => setPeople(e.target.value)}>
                        <option value="">-- Select number of people --</option>
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
                <hr></hr>
                <div className={styles.input}>
                    <label htmlFor="date"><strong>Select a date:</strong></label>
                    <input type="date" name="date" min={dateThing} value={date} onChange={(e) => setDate(e.target.value)} />
                    <label htmlFor="time" min={today}><strong>Select a time:</strong></label>
                    <input type="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
                <button type="submit" disabled={!people || !date || !time ? true : false}>Reserve table</button>
            </form>
    )
}

    // const today = new Date().toISOString();
    // console.log(today)
    // const formatDate = today.substring(0,today.length-1)
    // console.log(formatDate)
    // const dateTimeLocal = formatDate.slice(0, 16)
    // console.log(dateTimeLocal)
    // const reservationTime = formatDate.slice(11, 13)
    // console.log(reservationTime)
    // const futureTime = parseInt(reservationTime)+2
    // console.log(futureTime)
