import styled from "styled-components";
import { ReservationCard } from "../../Reservations/ReservationCard";

const Wrapper = styled.div`
	width: 1600px;
	height: auto;
	min-height: 950px;
	background-color: white;
	display: flex;
	flex-direction: row;
	align-items: top;
	justify-content: flex-start;
`;
const ReservationContainer = styled.div`
	width: 700px;
	height: auto;
	min-height: 950px;
	background-color: #f3f3f3;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: left;
`;

export const MyReservations = () => {
	return (
		<Wrapper>
			<aside>
				<div></div>
			</aside>
			<ReservationContainer>
				<ReservationCard />
			</ReservationContainer>
		</Wrapper>
	);
};
