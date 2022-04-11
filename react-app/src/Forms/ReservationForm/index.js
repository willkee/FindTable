import styles from "./ReservationForm.module.css";
// import Calendar from 'react-calendar'
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../store/restaurants";
import { getUser } from "../../store/session";
// import { GreyStar } from "../../components/Icons";

export const ReservationForm = ({ restaurant }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.session.user);
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [people, setPeople] = useState(1);
	const [errors, setErrors] = useState([]);
	const hour = new Date().getHours();

	const timeObj = new Date();
	// convert local time zone offset from minutes to milliseconds
	const zone = timeObj.getTimezoneOffset() * 60 * 1000;
	// subtract offset from t
	let tLocal = timeObj - zone;
	// create shifted Date object
	const localTime = new Date(tLocal);
	// convert to iso format string
	const iso = localTime.toISOString();
	// drop the milliseconds and zone
	const isoNoZone = iso.slice(0, 19);
	// replace the T
	const today = isoNoZone.replace("T", " ").slice(0, 10);

	const reservationTimes = []
    const reservations = Object.entries(restaurant.reservations);

    reservations.forEach(reservation => (
        reservationTimes.push(reservation.time)
    ));

	const handleSubmit = async (e) => {
		e.preventDefault();

		if(!date) {
            alert('Please select a date for your reservation.');
            return
        } else if (!time) {
            alert('Please select a timeslot for your reservation.');
            return
        }

		const reservationData = {
			restaurant_id: restaurant.id,
			user_id: user.id,
			num_people: people,
			date: date,
			time: time,
		};

		const newReservation = await dispatch(
			createReservation(reservationData)
		)

		await dispatch(getUser())

		if (newReservation.error) {
			setErrors(newReservation.error);
		} else {
			history.push("/my-profile");
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<ul>{errors && errors.map((error) => <li>{error}</li>)}</ul>
			<strong className={styles.title}>Make a reservation</strong>
			<hr></hr>
			<div className={styles.party}>
				<strong>Party Size</strong>
				<p>
					If you're party has more than 10 people, please call the
					restaurant.
				</p>
				<select
					value={people}
					onChange={(e) => setPeople(e.target.value)}
				>
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
				<label htmlFor="date" style={{ marginTop: "10px" }}>
					<strong>Select a date:</strong>
				</label>
				<input
					type="date"
					name="date"
					min={today}
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<label htmlFor="time" style={{ marginTop: "10px" }}>
					<strong>Select a time:</strong>
				</label>
				<p style={{ padding: "0px", marginTop: "0px" }}>
					Please pick a time between 8AM and 10:00PM.
				</p>
				<select value={time} onChange={(e) => setTime(e.target.value)}>
					<option value="">--Select a time--</option>
					<optgroup label="Breakfast">
						<option
							value={"8"}
							disabled={date === today && hour > 6 ? true : false}
						>
							8:00 AM
						</option>
						<option
							value={"8.5"}
							disabled={date === today && hour > 6 ? true : false}
						>
							8:30 AM
						</option>
						<option
							value={"9"}
							disabled={date === today && hour > 7 ? true : false}
						>
							9:00 AM
						</option>
						<option
							value={"9.5"}
							disabled={date === today && hour > 7 ? true : false}
						>
							9:30 AM
						</option>
						<option
							value={"10"}
							disabled={date === today && hour > 8 ? true : false}
						>
							10:00 AM
						</option>
						<option
							value={"10.5"}
							disabled={date === today && hour > 8 ? true : false}
						>
							10:30 AM
						</option>
					</optgroup>
					<optgroup label="Lunch">
						<option
							value={"11"}
							disabled={date === today && hour > 9 ? true : false}
						>
							11:00 AM
						</option>
						<option
							value={"11.5"}
							disabled={date === today && hour > 9 ? true : false}
						>
							11:30 AM
						</option>
						<option
							value={"12"}
							disabled={
								date === today && hour > 10 ? true : false
							}
						>
							12:00 PM
						</option>
						<option
							value={"12.5"}
							disabled={
								date === today && hour > 10 ? true : false
							}
						>
							12:30 PM
						</option>
						<option
							value={"13"}
							disabled={
								date === today && hour > 11 ? true : false
							}
						>
							1:00 PM
						</option>
						<option
							value={"13.5"}
							disabled={
								date === today && hour > 11 ? true : false
							}
						>
							1:30 PM
						</option>
						<option
							value={"14"}
							disabled={
								date === today && hour > 12 ? true : false
							}
						>
							2:00 PM
						</option>
					</optgroup>
					<optgroup label="Afternoon">
						<option
							value={"14.5"}
							disabled={
								date === today && hour > 12 ? true : false
							}
						>
							2:30 PM
						</option>
						<option
							value={"15"}
							disabled={
								date === today && hour > 13 ? true : false
							}
						>
							3:00 PM
						</option>
						<option
							value={"15.5"}
							disabled={
								date === today && hour > 13 ? true : false
							}
						>
							3:30 PM
						</option>
						<option
							value={"16"}
							disabled={
								date === today && hour > 14 ? true : false
							}
						>
							4:00 PM
						</option>
						<option
							value={"16.5"}
							disabled={
								date === today && hour > 14 ? true : false
							}
						>
							4:30 PM
						</option>
					</optgroup>
					<optgroup label="Dinner">
						<option
							value={"17"}
							disabled={
								date === today && hour > 15 ? true : false
							}
						>
							5:00 PM
						</option>
						<option
							value={"17.5"}
							disabled={
								date === today && hour > 15 ? true : false
							}
						>
							5:30 PM
						</option>
						<option
							value={"18"}
							disabled={
								date === today && hour > 16 ? true : false
							}
						>
							6:00 PM
						</option>
						<option
							value={"18.5"}
							disabled={
								date === today && hour > 16 ? true : false
							}
						>
							6:30 PM
						</option>
						<option
							value={"19"}
							disabled={
								date === today && hour > 17 ? true : false
							}
						>
							7:00 PM
						</option>
						<option
							value={"19.5"}
							disabled={
								date === today && hour > 17 ? true : false
							}
						>
							7:30 PM
						</option>
						<option
							value={"20"}
							disabled={
								date === today && hour > 18 ? true : false
							}
						>
							8:00 PM
						</option>
						<option
							value={"20.5"}
							disabled={
								date === today && hour > 18 ? true : false
							}
						>
							8:30 PM
						</option>
						<option
							value={"21"}
							disabled={
								date === today && hour > 19 ? true : false
							}
						>
							9:00 PM
						</option>
						<option
							value={"21.5"}
							disabled={
								date === today && hour > 19 ? true : false
							}
						>
							9:30 PM
						</option>
						<option
							value={"22"}
							disabled={
								date === today && hour > 20 ? true : false
							}
						>
							10:00 PM
						</option>
					</optgroup>
				</select>
			</div>
			<div
				className={styles.button}
				onClick={handleSubmit}
			>
				Reserve table
			</div>
		</form>
	);
};
