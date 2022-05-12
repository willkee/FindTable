import styled from "styled-components";
// import styles from "./MyReservations.module.css";
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

export const MyReservations = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const reservations = Object.values(sessionUser.reservations);
	return (
		<ContentFeed>
			<Reservations>
				<h2 style={{ marginLeft: "-50px", fontSize: "32px" }}>
					<strong>Upcoming Reservations</strong>
				</h2>
				{reservations &&
					reservations.map((reservation, idx) => (
						<ProfileReservationCard
							key={idx}
							reservation={reservation}
						/>
					))}
			</Reservations>
		</ContentFeed>
	);
};
