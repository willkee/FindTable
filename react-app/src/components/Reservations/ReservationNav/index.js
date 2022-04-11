import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ReservationNavItem } from "../ReservationNavItem";

const DropdownAnimation = keyframes`
	0% { transform: translateY(-20px); }
	100% { opacity: 1; }
`;

const ReservationDropdown = styled.div`
	width: 350px;
	position: absolute;
	right: 0;
	height: auto;
	min-height: 100px;
	max-height: 750px;
	background-color: white;
	border: 1px solid #e1e1e1;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: space-around;
	justify-content: left;
	padding-left: 15px;
	padding-right: 15px;
	animation: ${DropdownAnimation} 0.2s ease-in-out;
	z-index: 999;
`;

export const ReservationNav = () => {
	const sessionUser = useSelector((state) => state.session.user);
	let reservations;
	sessionUser
		? (reservations = sessionUser.reservations)
		: (reservations = null);
	let reservationsArr;
	reservations
		? (reservationsArr = Object.entries(reservations))
		: (reservationsArr = null);
	const resCopy = [...reservationsArr].slice(0, 3);

	// const [myReservations, setMyReservations] = useState(sessionUser.reservations)

	useEffect(() => {
		// console.log(myReservations)
	}, [sessionUser]);

	if (reservationsArr.length < 1) {
		return (
			<ReservationDropdown>
				<h3>Upcoming reservations</h3>
				<hr style={{ width: "100%" }}></hr>
				<h4>You have no reservations.</h4>
			</ReservationDropdown>
		);
	} else if (reservationsArr.length < 4) {
		return (
			<ReservationDropdown>
				<h3>Upcoming reservations</h3>
				<hr></hr>
				{reservationsArr.map((reservation) => (
					<>
						<ReservationNavItem reservation={reservation[1]} />
						<hr></hr>
					</>
				))}
				<Link to="/my-profile" />
			</ReservationDropdown>
		);
	} else {
		return (
			<ReservationDropdown>
				<h3>Upcoming reservations</h3>
				<hr></hr>
				{resCopy.map((reservation) => (
					<>
						<ReservationNavItem reservation={reservation[1]} />
						<hr></hr>
					</>
				))}
				<Link to="/my-profile">View all of your reservations</Link>
			</ReservationDropdown>
		);
	}
};
