import React from "react";
import { useSelector } from "react-redux";
// import { ReviewIcon } from '../../../Icons';
import styles from "./MyReviews.module.css";
import { starRender } from "../../../ReviewsDisplay/starRender";

export const MyReviews = () => {
	const restaurants = useSelector((state) => state.restaurants);
	const myRev = useSelector((state) =>
		Object.values(state.session.user.reviews)
	);
	console.log(myRev);

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
						<div className={styles.image}>
							<img
								src={
									restaurants[`${review.restaurant_id}`]
										.img_url
								}
								alt=""
							/>
						</div>
						<div
							className={styles.name}
							style={{
								backgroundColor: `${
									brightColors[getRandomInt(5)]
								}`,
							}}
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
