import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import pattern from "./pattern.png";
import styles from "./SingleRestaurant.module.css";

import ReviewCounter from "../ReviewCounter";
import { ReviewsDisplay } from "../ReviewsDisplay";
import { ReservationForm } from "../../Forms/ReservationForm";
import { UpdateRestaurant } from "../UpdateRestaurant";
import { DeleteRestaurant } from "../DeleteRestaurant";
import { receiveOneRestaurant } from "../../store/restaurants";
import { addFavorite, removeFavorite } from "../../store/session";

import StarCount from "./StarCount";

// import { showModal, setCurrentModal } from '../../store/modal';
import { ReviewForm } from "../../Forms/ReviewForm";
import { GreyStar, RedStar } from "../Icons";

export const SingleRestaurant = () => {
	const sessionUser = useSelector((state) => state?.session?.user);
	const { id } = useParams();
	const restaurant = useSelector((state) => state.restaurants)[`${id}`];

	let isFavorite;
	const favId = sessionUser?.favorites[`${id}`]?.id; // if the user has selected this favorite. Find the id of the instance of the Favorite
	sessionUser?.favorites?.hasOwnProperty(`${id}`)
		? (isFavorite = true)
		: (isFavorite = false);

	const [myKey, setMyKey] = useState("");
	const [isLoaded, setIsLoaded] = useState(false);
	const [favToggle, setFavToggle] = useState(isFavorite);
	// find restaurant owner id and session user id

	// const restaurant = useSelector(state => (state.restaurants))

	const dispatch = useDispatch();

	// console.log('isFavorite ---', isFavorite)

	// set isOwner to true if the current user owns the restaurant being viewed
	// this will display the update/delete restaurant buttons
	let isOwner = false;
	sessionUser && restaurant?.owner_id === sessionUser.id
		? (isOwner = true)
		: (isOwner = false);

	// const handleNewReview = () => {
	//   dispatch(createReview({

	//   }))
	// }
	const handleFavorite = async () => {
		setFavToggle(!favToggle);
		!favToggle
			? dispatch(addFavorite(id))
			: dispatch(removeFavorite(favId));
	};

	// useEffect(() => {
	//   favToggle ? dispatch(addFavorite(id)) : dispatch(removeFavorite(id))
	// },[dispatch, favToggle])

	useEffect(() => {
		(async () => {
			const res = await fetch(`/api/auth/get_key`);
			const key = await res.json();
			setMyKey(key);
		})();
		dispatch(receiveOneRestaurant(id))
			.then(() => setIsLoaded(true))
			.catch((e) => console.error("Error: ", e));
	}, [dispatch, id]);

	const API_URL = `https://maps.googleapis.com/maps/api/staticmap?center=${restaurant.street_address}&zoom=16&size=300x500&maptype=roadmap&markers=color:red%7Clabel:.%7C${restaurant.street_address}&key=${myKey.key}`;

	const getAverageRating = (data) => {
		if (Object.values(restaurant?.reviews).length === 0) {
			return "No Ratings";
		}
		let totalStars = 0;
		Object.values(data?.reviews).forEach(
			(review) => (totalStars += review.stars)
		);
		return (totalStars / Object.values(data?.reviews).length).toFixed(1);
	};

	const showPriceRating = (num) => {
		if (num === 1) {
			return `$10 and under (per person)`;
		} else if (num === 2) {
			return `$11 - $30 (per person)`;
		} else if (num === 3) {
			return `$31 - $50 (per person)`;
		} else {
			return `More than $50 (per person)`;
		}
	};

	return (
		<div className={styles.single_container1}>
			{isLoaded && (
				<div className={styles.single_container2}>
					<img
						src={pattern}
						className={styles.sr_banner}
						alt="banner pattern"
					></img>
					<img
						className={styles.sr_img}
						src={restaurant.img_url}
						alt=""
						width="200px"
					></img>
					<div className={styles.content_container1}>
						<div className={styles.left}>
							<ReservationForm restaurantId={id} />
						</div>
						<div className={styles.center}>
							<h1>{restaurant.name}</h1>

							<div className={styles.content_sub1}>
								{/* Restaurant Price Rating */}
								<span>
									<i className="fa-solid fa-money-check-dollar"></i>{" "}
									{showPriceRating(restaurant.price_rating)}
								</span>

								{/* Restaurant Cuisine */}
								<span>
									<i className="fa-solid fa-utensils"></i>{" "}
									{restaurant?.cuisines?.map((cuisine) => (
										<span key={cuisine.id}>
											{cuisine.type}{" "}
										</span>
									))}
								</span>

								{/* Restaurant Setting */}
								<span>
									<i className="fa-solid fa-building"></i>{" "}
									{restaurant?.settings?.map((setting) => (
										<span key={setting.id}>
											{setting.type}{" "}
										</span>
									))}
								</span>
							</div>

							<div className={styles.content_sub2}>
								{/* Restaurant Star Rating */}
								<span>
									<StarCount
										rating={getAverageRating(restaurant)}
									/>
									<span className={styles.rating_num_header}>
										{getAverageRating(restaurant)}
									</span>
								</span>

								{/* Restaurant Review Count */}
								<span>
									<i className="fa-solid fa-message" />{" "}
									<span
										className={styles.rating_num_header}
									>{` ${
										Object.values(restaurant.reviews).length
									} Reviews`}</span>
								</span>
							</div>

							{isOwner && (
								<div className={styles.button_container}>
									<UpdateRestaurant restaurant={restaurant} />
									<DeleteRestaurant
										restaurant_id={restaurant.id}
									/>
								</div>
							)}

							{sessionUser && (
								<>
									<div
										role="button"
										className={styles.favorite_container}
										onClick={handleFavorite}
									>
										{favToggle ? (
											<div
												className={styles.favorite_star}
											>
												<RedStar />
											</div>
										) : (
											<div
												className={styles.favorite_star}
											>
												<GreyStar />
											</div>
										)}
										Add to Favorites
									</div>
									<div>Added to Favorites!</div>
									<div>Removed from Favorites!</div>
								</>
							)}

							<div className={styles.desc}>
								{restaurant.description}
							</div>
							<div>
								{Object.values(restaurant.reviews).length >
								0 ? (
									Object.values(restaurant.reviews).length ===
									1 ? (
										<div>
											<h3>
												What{" "}
												{
													Object.values(
														restaurant.reviews
													).length
												}{" "}
												person is saying
											</h3>
											<hr
												className={styles.horiz_line}
											></hr>
											<ReviewCounter
												stars={Object.values(
													restaurant.reviews
												).map((review) => review.stars)}
											/>
											<hr
												className={styles.horiz_line}
											></hr>
										</div>
									) : (
										<div>
											<h3>
												What{" "}
												{
													Object.values(
														restaurant.reviews
													).length
												}{" "}
												people are saying
											</h3>
											<hr
												className={styles.horiz_line}
											></hr>
											<ReviewCounter
												stars={Object.values(
													restaurant.reviews
												).map((review) => review.stars)}
											/>
											<hr
												className={styles.horiz_line}
											></hr>
										</div>
									)
								) : (
									<div>
										<h3>There are no reviews.</h3>
										<hr></hr>
									</div>
								)}
							</div>
							<div className={styles.review_parent_container}>
								{sessionUser && (
									<ReviewForm restaurant={restaurant} />
								)}
								<ReviewsDisplay restaurant={restaurant} />
							</div>
						</div>

						<div className={styles.right}>
							<div className={styles.gmaps_static}>
								<img src={API_URL} alt="Google Maps"></img>
							</div>
							<div className={styles.address_text}>
								<div>
									{restaurant.street_address
										.split(",")[0]
										.split(" ")
										.map(
											(word) =>
												word[0].toUpperCase() +
												word.slice(1)
										)
										.join(" ")}
								</div>
								<div>{`${restaurant.borough}, NY ${
									restaurant.street_address.split(",")[1]
								}`}</div>
							</div>
							<div>
								<a
									href={restaurant.website}
									target="_blank"
									rel="noreferrer"
								>
									<i className="fa-solid fa-earth-americas"></i>{" "}
									Website
								</a>
							</div>
							<div>
								<a
									href={`https://www.google.com/maps/place/${restaurant.street_address}`}
									target="_blank"
									rel="noreferrer"
								>
									<i className="fa-solid fa-diamond-turn-right" />
									Get Directions
								</a>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
