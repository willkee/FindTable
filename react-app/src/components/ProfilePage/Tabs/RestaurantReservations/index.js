import styled from "styled-components";
// import styles from "./RestaurantReservations.module.css";
import React from "react";
import { useSelector } from "react-redux";
import { RestaurantReservationCard } from "../../../Reservations/RestaurantReservationCard";

// import { RestaurantReservationsCard } from "../../../Reservations/RestaurantReservationsCard";

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

	return (
		<ContentFeed>
			<Reservations>
				<h2 style={{ marginLeft: "-50px", fontSize: "32px" }}>
					<strong>Upcoming Reservations</strong>
				</h2>
				{restaurants.map((restaurant) => (
					<div>
						<p
							style={{
								fontSize: "1.4rem",
								fontWeight: "bold",
								padding: "0px",
								margin: "0px",
								marginLeft: "-50px",
							}}
						>
							{restaurant.name}
						</p>
						{Object.values(restaurant.reservations).map(
							(reservation) => (
								<RestaurantReservationCard
									reservation={reservation}
								/>
							)
						)}
						{!Object.values(restaurant.reservations).length && (
							<h4 style={{ marginLeft: "-50px" }}>
								No reservations.
							</h4>
						)}
					</div>
				))}
			</Reservations>
		</ContentFeed>
	);
};
