import React from "react";
import styled from "styled-components";
import styles from "./ReservationNavItem.module.css";
import {
	RestaurantCircle,
	UserIcon,
	ClockIcon,
	CalendarIconSmall,
} from "../../Icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteReservation } from "../DeleteReservation";
import { UpdateReservation } from "../UpdateReservation";

const ReservationContainer = styled.div`
	width: 285px;
	height: 175px;
	display: flex;
	flex-direction: row;
	hustify-content: space-between;
	align-items: top;
`;

const ReservationInfo = styled.div`
	width: 240px;
	height: 175px;
	display: flex;
	flex-direction: column;
	align-items: space-between;
	justify-content: left;
`;

const Row = styled.div`
	width: 200px;
	height: 20px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

export const ReservationNavItem = ({ reservation }) => {
	const restaurant = useSelector((state) => state.restaurants)[
		reservation.restaurant_id
	];
	console.log(restaurant);
	let people;
	reservation.num_people === 1 ? (people = " person") : (people = " people");

	let reservationTime;
	let timeUnit;

	reservation.time.includes(".5")
		? (reservationTime = reservation.time.replace(/.5/, ":30"))
		: (reservationTime = reservation.time);
	reservation.time.length < 2 ||
	reservation.time === "10" ||
    reservation.time === "10.5" ||
	reservation.time === "11" ||
	reservation.time === "11.5"
		? (timeUnit = "AM")
		: (timeUnit = "PM");

	return (
		<ReservationContainer>
			<RestaurantCircle />
			<ReservationInfo>
				<Row>
					<strong>
						{restaurant.name} - {restaurant.borough}
					</strong>
				</Row>
				<Row>
					<UserIcon />
					<h4>
						Table for {reservation.num_people}
						{people}.
					</h4>
				</Row>
				<Row>
					<ClockIcon />
					<h4>
						{reservationTime} {timeUnit}
					</h4>
				</Row>
				<Row>
					<CalendarIconSmall />
					<h4>{reservation.date.slice(0, 16)}</h4>
				</Row>
				<Row>
					<Link className={styles.button} to="/my-profile">
						View
					</Link>
					<h5>|</h5>
					<UpdateReservation
						reservation={reservation}
					></UpdateReservation>
				</Row>
				<DeleteReservation reservationId={reservation.id} />
			</ReservationInfo>
		</ReservationContainer>
	);
};
