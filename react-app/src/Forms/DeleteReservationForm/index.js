import React from "react";
import { useDispatch } from "react-redux";
import { hideModal } from "../../store/modal";
import { deleteReservation } from "../../store/restaurants";
import { getUser } from "../../store/session";
import styles from "./DeleteReservationForm.module.css";
import styled from "styled-components";
import animation from "../../video/FindTable-loading.mp4";

const CancelContainer = styled.div`
	width: 400px;
	height: 500px;
	border: 1px solid white;
	border-radius: 5px;
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
`;

const Row = styled.div`
	width: 350px;
	height: 50px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const DeleteReservationForm = ({ reservationId }) => {
	const dispatch = useDispatch();

	const closeModal = async (e) => {
		e.preventDefault();
		await dispatch(hideModal());
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		await dispatch(hideModal());
		await dispatch(deleteReservation(reservationId));
		await dispatch(getUser());
	};

	return (
		<CancelContainer>
			<video loop autoPlay width="250">
				<source src={animation} type="video/mp4" />
				Sorry, your browser doesn't support embedded videos.
			</video>
			<h2>Are you sure you want to cancel your reservation?</h2>
			<Row>
				<div
					""
					className={styles.yes}
					onClick={handleDelete}
				>
					Yes
				</div>
				<div "" className={styles.no} onClick={closeModal}>
					No
				</div>
			</Row>
		</CancelContainer>
	);
};
