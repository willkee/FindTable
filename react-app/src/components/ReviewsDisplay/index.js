import React from "react";
import styles from "./ReviewsDisplay.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ReviewIcon } from "../Icons";
import { ReviewEdit } from "../ReviewEdit";
import { deleteReview } from "../../store/restaurants";
import { starRender } from "./starRender";

export const ReviewsDisplay = ({ restaurant }) => {
	const allUsers = useSelector((state) => state?.users);
	const reviews = Object.values(restaurant?.reviews);
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	const handleDelete = (id) => {
		dispatch(deleteReview(id, restaurant.id));
	};

	const colors = ["#7D2C3B", "#983937", "#4E3C24", "#7E4675", "#24599D"];

	return (
		<div className={styles.container}>
			{reviews.map((review) => (
				<div key={review.id} className={styles.singleReview}>
					<div className={styles.r_left}>
						<div className={styles.iconContainer}>
							<div
								className={styles.icon}
								style={{
									backgroundColor: `${
										colors[getRandomInt(5)]
									}`,
								}}
							>
								{allUsers[`${review.user_id}`].first_name[0]}
								{allUsers[`${review.user_id}`].last_name[0]}
							</div>
						</div>

						<div className={styles.nameAndCount}>
							{review.user_first_name}
							<br />
							<div className={styles.reviewCount}>
								{<ReviewIcon />}
								{
									Object.values(
										allUsers[`${review.user_id}`].reviews
									).length
								}{" "}
								reviews
							</div>
						</div>
					</div>

					<div className={styles.image}>
						<img
							src={review.img_url}
							alt=""
							className={styles.image}
						/>
					</div>

					<div className={styles.r_right}>
						<div className={styles.stars}>
							{starRender(review.stars)}
						</div>
						<div className={styles.content}>{review.review}</div>
					</div>

					<div className={styles.editDelete}>
						{sessionUser && review.user_id === sessionUser.id ? (
							<ReviewEdit
								review={review}
								edit={true}
								restaurantEdit={restaurant}
							/>
						) : null}
						{sessionUser && review.user_id === sessionUser.id ? (
							<div
								className={styles.delete}
								onClick={() => handleDelete(review.id)}
							>
								Delete
							</div>
						) : null}
					</div>
				</div>
			))}
		</div>
	);
};
