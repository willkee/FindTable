import React from "react";
import { hideModal } from "../../store/modal";
import styles from "./UpdateReservationForm.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateReservation } from "../../store/restaurants";
import { getUser } from "../../store/session";

export const UpdateReservationForm = ({ reservation }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [time, setTime] = useState(reservation.time);
	const [people, setPeople] = useState(reservation.num_people);
	const [newResDate, setNewResDate] = useState('');
	const [errors, setErrors] = useState([]);

	const restaurants = useSelector((state) => state.restaurants);
	const restaurant = restaurants[reservation.restaurant_id];
	const newDate = new Date(reservation.date);
	const newDateISO = newDate.toISOString();
	const newDateISONoZone = newDateISO.slice(0, 19);
	const oldResDate = newDateISONoZone.replace("T", " ").slice(0, 10);

	const timeObj = new Date();
	const zone = timeObj.getTimezoneOffset() * 60 * 1000;
	let tLocal = timeObj - zone;
	const localTime = new Date(tLocal);
	const iso = localTime.toISOString();
	const isoNoZone = iso.slice(0, 19);
	const today = isoNoZone.replace("T", " ").slice(0, 10);
	const [date, setDate] = useState(oldResDate);
	const [time, setTime] = useState(reservation?.time);
	const [people, setPeople] = useState(reservation?.num_people);
	const [errors, setErrors] = useState([]);

	let oldTime;
	let timeUnit;

	reservation.time.includes(".5")
		? (oldTime = reservation.time.replace(/.5/, ":30"))
		: (oldTime = reservation.time);
	reservation.time.length < 2 ||
	reservation.time === "10" ||
    reservation.time === "10.5" ||
	reservation.time === "11" ||
	reservation.time === "11.5"
		? (timeUnit = "AM")
		: (timeUnit = "PM");

	let peopleEnding;
	reservation.num_people === 1
		? (peopleEnding = " person")
		: (peopleEnding = " people");


	const hour = new Date().getHours();

	const reservationTimes = [];
	const reservations = Object.entries(restaurant.reservations);

	reservations.forEach((reservation) =>
		reservationTimes.push(reservation.time)
	);

	const closeModal = async (e) => {
		e.preventDefault();
		await dispatch(hideModal());
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!newResDate) {
			alert("Please select a date for your reservation.");
			return;
		} else if (!time) {
			alert("Please select a timeslot for your reservation.");
			return;
		}

		const updatedData = {
			reservation_id: reservation.id,
			restaurant_id: restaurant.id,
			user_id: user.id,
			num_people: people,
			date: newResDate,
			time: time,
		};

		const updatedRes = await dispatch(updateReservation(updatedData));

		await dispatch(getUser());

		if (updatedRes.error) {
			setErrors(updatedRes.error);
		} else {
			await dispatch(hideModal());
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<ul>
				{errors.map((error) => (
					<li key={error}>{error}</li>
				))}
			</ul>
			<strong className={styles.title}>Edit your reservation</strong>
			<hr></hr>
			<div className={styles.party}>
				<strong>New Party Size</strong>
				<p>
					Previously selection: {reservation.num_people}
					{peopleEnding}.
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
					<strong>New date:</strong>
				</label>
				<p style={{ padding: "0px", marginTop: "0px" }}>
					Previous selection: {oldResDate}{}
				</p>
				<input
					type="date"
					name="date"
					min={today}
					value={newResDate}
					onChange={(e) => setNewResDate(e.target.value)}
				/>
			</div>
			<hr></hr>
			<div className={styles.input}>
				<label htmlFor="time" style={{ marginTop: "10px" }}>
					<strong>New time:</strong>
				</label>
				<p style={{ padding: "0px", marginTop: "0px" }}>
					Previous selection: {oldTime} {timeUnit}{" "}
				</p>
				<select value={time} onChange={(e) => setTime(e.target.value)}>
					<option value="">--Select a time--</option>
					<optgroup label="Breakfast">
						<option
							value={"8"}
							disabled={
								(newResDate === today && hour > 6) ||
								reservationTimes.includes("8")
									? true
									: false
							}
						>
							8:00 AM
						</option>
						<option
							value={"8.5"}
							disabled={
								(newResDate === today && hour > 6) ||
								reservationTimes.includes("8.5")
									? true
									: false
							}
						>
							8:30 AM
						</option>
						<option
							value={"9"}
							disabled={
								(newResDate === today && hour > 7) ||
								reservationTimes.includes("9")
									? true
									: false
							}
						>
							9:00 AM
						</option>
						<option
							value={"9.5"}
							disabled={
								(newResDate === today && hour > 7) ||
								reservationTimes.includes("9.5")
									? true
									: false
							}
						>
							9:30 AM
						</option>
						<option
							value={"10"}
							disabled={
								(newResDate === today && hour > 8) ||
								reservationTimes.includes("10")
									? true
									: false
							}
						>
							10:00 AM
						</option>
						<option
							value={"10.5"}
							disabled={
								(newResDate === today && hour > 8) ||
								reservationTimes.includes("10.5")
									? true
									: false
							}
						>
							10:30 AM
						</option>
					</optgroup>
					<optgroup label="Lunch">
						<option
							value={"11"}
							disabled={
								(newResDate === today && hour > 9) ||
								reservationTimes.includes("11")
									? true
									: false
							}
						>
							11:00 AM
						</option>
						<option
							value={"11.5"}
							disabled={
								(newResDate === today && hour > 9) ||
								reservationTimes.includes("11.5")
									? true
									: false
							}
						>
							11:30 AM
						</option>
						<option
							value={"12"}
							disabled={
								(newResDate === today && hour > 10) ||
								reservationTimes.includes("12")
									? true
									: false
							}
						>
							12:00 PM
						</option>
						<option
							value={"12.5"}
							disabled={
								(newResDate === today && hour > 10) ||
								reservationTimes.includes("12.5")
									? true
									: false
							}
						>
							12:30 PM
						</option>
						<option
							value={"13"}
							disabled={
								(newResDate === today && hour > 11) ||
								reservationTimes.includes("13")
									? true
									: false
							}
						>
							1:00 PM
						</option>
						<option
							value={"13.5"}
							disabled={
								(newResDate === today && hour > 11) ||
								reservationTimes.includes("13.5")
									? true
									: false
							}
						>
							1:30 PM
						</option>
						<option
							value={"14"}
							disabled={
								(newResDate === today && hour > 12) ||
								reservationTimes.includes("14")
									? true
									: false
							}
						>
							2:00 PM
						</option>
					</optgroup>
					<optgroup label="Afternoon">
						<option
							value={"14.5"}
							disabled={
								(newResDate === today && hour > 12) ||
								reservationTimes.includes("14.5")
									? true
									: false
							}
						>
							2:30 PM
						</option>
						<option
							value={"15"}
							disabled={
								(newResDate === today && hour > 13) ||
								reservationTimes.includes("15")
									? true
									: false
							}
						>
							3:00 PM
						</option>
						<option
							value={"15.5"}
							disabled={
								(newResDate === today && hour > 13) ||
								reservationTimes.includes("15.5")
									? true
									: false
							}
						>
							3:30 PM
						</option>
						<option
							value={"16"}
							disabled={
								(newResDate === today && hour > 14) ||
								reservationTimes.includes("16")
									? true
									: false
							}
						>
							4:00 PM
						</option>
						<option
							value={"16.5"}
							disabled={
								(newResDate === today && hour > 14) ||
								reservationTimes.includes("16.5")
									? true
									: false
							}
						>
							4:30 PM
						</option>
					</optgroup>
					<optgroup label="Dinner">
						<option
							value={"17"}
							disabled={
								(newResDate === today && hour > 15) ||
								reservationTimes.includes("17")
									? true
									: false
							}
						>
							5:00 PM
						</option>
						<option
							value={"17.5"}
							disabled={
								(newResDate === today && hour > 15) ||
								reservationTimes.includes("17.5")
									? true
									: false
							}
						>
							5:30 PM
						</option>
						<option
							value={"18"}
							disabled={
								(newResDate === today && hour > 16) ||
								reservationTimes.includes("18")
									? true
									: false
							}
						>
							6:00 PM
						</option>
						<option
							value={"18.5"}
							disabled={
								(newResDate === today && hour > 16) ||
								reservationTimes.includes("18.5")
									? true
									: false
							}
						>
							6:30 PM
						</option>
						<option
							value={"19"}
							disabled={
								(newResDate === today && hour > 17) ||
								reservationTimes.includes("19")
									? true
									: false
							}
						>
							7:00 PM
						</option>
						<option
							value={"19.5"}
							disabled={
								(newResDate === today && hour > 17) ||
								reservationTimes.includes("19.5")
									? true
									: false
							}
						>
							7:30 PM
						</option>
						<option
							value={"20"}
							disabled={
								(newResDate === today && hour > 18) ||
								reservationTimes.includes("20")
									? true
									: false
							}
						>
							8:00 PM
						</option>
						<option
							value={"20.5"}
							disabled={
								(newResDate === today && hour > 18) ||
								reservationTimes.includes("20.5")
									? true
									: false
							}
						>
							8:30 PM
						</option>
						<option
							value={"21"}
							disabled={
								(newResDate === today && hour > 19) ||
								reservationTimes.includes("21")
									? true
									: false
							}
						>
							9:00 PM
						</option>
						<option
							value={"21.5"}
							disabled={
								(newResDate === today && hour > 19) ||
								reservationTimes.includes("21.5")
									? true
									: false
							}
						>
							9:30 PM
						</option>
						<option
							value={"22"}
							disabled={
								(newResDate === today && hour > 20) ||
								reservationTimes.includes("22")
									? true
									: false
							}
						>
							10:00 PM
						</option>
					</optgroup>
				</select>
			</div>
			<hr></hr>
			<div className={styles.button} onClick={handleSubmit}>
				Reserve table
			</div>
			<div className={styles.button} onClick={closeModal}>
				Cancel
			</div>
		</form>
	);
};
