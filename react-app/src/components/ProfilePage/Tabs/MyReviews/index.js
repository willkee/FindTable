import React from "react";
import { useSelector } from "react-redux";
import styles from "./MyReviews.module.css";
import { starRender } from "../../../ReviewsDisplay/starRender";
import { useHistory } from "react-router-dom";

export const MyReviews = () => {
	const restaurants = useSelector((state) => state.restaurants);
	const history = useHistory();
	const myRev = useSelector((state) =>
		Object.values(state.session.user.reviews)
	);
	const restaurantPage = (id) => {
		history.push(`/restaurants/${id}`);
	};

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	const brightColors = [
		"#D24E65",
		"#FC6260",
		"#F2BB78",
		"#D97ECB",
		"#4895FD",
	];

	return (
		<>
			<h1>Your reviews</h1>

			<div className={styles.reviews}>
				{myRev.map((review) => (
					<div className={styles.singleReview}>
						<div className={styles.imageContainer}>
							<img
								className={styles.image}
								src={
									restaurants[`${review.restaurant_id}`]
										.img_url
								}
								alt="review upload"
								onClick={() =>
									restaurantPage(
										restaurants[`${review.restaurant_id}`]
									)
								}
							/>
						</div>
						<div
							className={styles.name}
							style={{
								backgroundColor: `${
									brightColors[getRandomInt(5)]
								}`,
							}}
							onClick={() =>
								restaurantPage(
									restaurants[`${review.restaurant_id}`]
								)
							}
						>
							{restaurants[`${review.restaurant_id}`]?.name} - New
							York, NY |{" "}
							{restaurants[`${review.restaurant_id}`]?.borough}
						</div>
						<div className={styles.reviewAndStars}>
							<div>{review.review}</div>
							<div className={styles.stars}>
								{starRender(review.stars)}
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
