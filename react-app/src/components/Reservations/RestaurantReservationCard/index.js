import styled from "styled-components";
import {
	GreenConfirmationButton,
	UserIcon,
	CalendarIconSmall,
} from "../../Icons";
import { useSelector } from "react-redux";
import styles from "./RestaurantReservationCard.module.css";

const ReservationContainer = styled.div`
	width: 540px;
	height: 130px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-left: -50px;
	margin-bottom: 40px;
`;

const ReservationDetails = styled.div`
	width: 380px;
	height: 125px;
	display: flex;
	flex-direction: column;
	align-items: left;
	justify-content: space-around;
`;

const IconTextBox = styled.div`
	width: 450px;
	height: 35px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

// const ActionBox = styled.div`
// 	width: 110px;
// 	height: 25px;
// 	display: flex;
// 	flex-direction: row;
// 	justify-content: space-between;
// 	align-items: center;
// `;

export const RestaurantReservationCard = ({ reservation }) => {
	const restaurants = useSelector((state) => state.restaurants);

	return (
		<ReservationContainer>
			<img
				src={restaurants[reservation.restaurant_id].img_url}
				alt={`Restaurant for ${
					restaurants[reservation.restaurant_id].name
				}`}
			></img>
			<ReservationDetails>
				<strong>
					{restaurants[reservation.restaurant_id].name} |{" "}
					{restaurants[reservation.restaurant_id].borough}{" "}
				</strong>
				<IconTextBox>
					<GreenConfirmationButton />
					<h4>Reservation confirmed</h4>
				</IconTextBox>
				<IconTextBox>
					<UserIcon />
					<h4 className={styles.people}>{reservation.num_people}</h4>
					<div className={styles.res}>
						<CalendarIconSmall />
						<h4>
							{reservation.date.slice(0, 16)}, at{" "}
							{reservation.time.includes(".5")
								? reservation.time.replace(/.5/, ":30")
								: reservation.time}
							{reservation.time.length < 2 ||
							reservation.time === "10" ||
							reservation.time === "10.5" ||
							reservation.time === "11" ||
							reservation.time === "11.5"
								? "AM"
								: "PM"}
						</h4>
					</div>
				</IconTextBox>
			</ReservationDetails>
		</ReservationContainer>
	);
};
