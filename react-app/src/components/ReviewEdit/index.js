import React from "react";
import { useDispatch } from "react-redux";
import { showModal, setCurrentModal } from "../../store/modal";
import EditReviewForm from "../../Forms/EditReviewForm";

import styles from "./ReviewEdit.module.css";

export const ReviewEdit = ({ review }) => {
	const dispatch = useDispatch();

	const showReviewEditForm = () => {
		dispatch(setCurrentModal(() => <EditReviewForm review={review} />));
		dispatch(showModal());
	};

	return (
		<div onClick={showReviewEditForm} className={styles.edit}>
			<i className="fa-solid fa-pen-to-square"></i>
		</div>
	);
};
