import styled from "styled-components";
// import styles from "./RestaurantReservations.module.css";
import React from "react";
import { useSelector } from "react-redux";
import { ProfileReservationCard } from "../../../Reservations/ProfileReservationCard";

const Reservations = styled.div`
	width: 900px;
	height: auto;
	min-height: 90vh;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: 20px;
	align-items: left;
	padding: 10px 30px;
	position: relative;
	cursor: pointer;
`;

const ContentFeed = styled.div`
	height: auto;
	width: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;

export const RestaurantReservations = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const restaurants = Object.values(sessionUser.restaurants);
	const reservationsList = [];
	restaurants.forEach((restaurant) =>
		reservationsList.push(restaurant.reservations)
	);
	const reservations = [];
	reservationsList.forEach((reservation) => {
		if (reservation.length > 1) {
			reservations.push(reservation);
		}
	});
	return (
		<ContentFeed>
			<Reservations>
				<h2 style={{ marginLeft: "-50px", fontSize: "32px" }}>
					<strong>Upcoming Reservations</strong>
				</h2>
				{reservations.length >= 1 &&
					reservations.map((reservation) => (
						<ProfileReservationCard reservation={reservation} />
					))}
				{reservations.length === 0 && restaurants.length === 1 && (
					<h3 style={{ marginLeft: "-50px" }}>
						Your restaurant has no upcoming reservations.
					</h3>
				)}
				{reservations.length === 0 && restaurants.length > 1 && (
					<h3 style={{ marginLeft: "-50px" }}>
						Your restaurants have no upcoming reservations.
					</h3>
				)}
			</Reservations>
		</ContentFeed>
	);
};
