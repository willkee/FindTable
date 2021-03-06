import React from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { PageContainer } from "../PageContainer";
import styles from "./SearchResults.module.css";

const SearchResults = () => {
	const { searchWord } = useParams();
	const history = useHistory();

	const restaurants = useSelector((state) => state.restaurants);

	const restaurants_set = new Set();
	Object.values(restaurants).forEach((restaurant, index) => {
		if (restaurant.name.toLowerCase().includes(searchWord.toLowerCase())) {
			restaurants_set.add(restaurant.id);
		}
		if (
			restaurant.borough.toLowerCase().includes(searchWord.toLowerCase())
		) {
			restaurants_set.add(restaurant.id);
		}
	});

	const sendToRestaurant = (restaurant_index) => {
		history.push(`/restaurants/${restaurant_index}`);
	};

	const matched_restaurants = Array.from(restaurants_set);

	return (
		<PageContainer>
			<div className={styles.header_results}>
				<h1>Search Results</h1>
				<div
					className={styles.return_home}
					onClick={() => history.push("/")}
				>
					Return Home
				</div>
			</div>
			<div className={styles.all_restaurants}>
				{matched_restaurants.length ? (
					<div className={styles.parent_container_each}>
						<div
							className={styles.search_intro_message}
						>{`You searched for "${searchWord}":`}</div>
						<div>
							<strong>{`Your search result has returned ${matched_restaurants.length} restaurants: `}</strong>
						</div>
						<div className={styles.each_restaurant}>
							{matched_restaurants.map(
								(restaurant_index, idx) => (
									<div
										className={styles.each_wrapper}
										onClick={() =>
											sendToRestaurant(restaurant_index)
										}
										key={idx}
									>
										<img
											src={
												restaurants[restaurant_index]
													.img_url
											}
											alt="restaurant"
											width="200px"
										></img>
										<div
											className={styles.each_wrapper_info}
										>
											<div>
												{
													restaurants[
														restaurant_index
													].name
												}
											</div>
											<div>
												<i className="fa-solid fa-map-location-dot"></i>
												<span>
													{
														restaurants[
															restaurant_index
														].borough
													}
												</span>
											</div>
											<div>
												<span>
													{`${
														restaurants[
															restaurant_index
														].price_rating === 4
															? "$$$$"
															: restaurants[
																	restaurant_index
															  ].price_rating ===
															  3
															? "$$$"
															: restaurants[
																	restaurant_index
															  ].price_rating ===
															  2
															? "$$"
															: "$"
													}`}
												</span>
											</div>
											<div>
												<span>
													{Object.values(
														restaurants[
															restaurant_index
														].settings
													).map((setting) => (
														<span>{` ${setting.type} | `}</span>
													))}
												</span>
												<span>
													{Object.values(
														restaurants[
															restaurant_index
														].cuisines
													).map((cuisine) => (
														<span>{` ${cuisine.type} `}</span>
													))}
												</span>
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				) : (
					<div className={styles.no_search_results}>
						<div>No Search Results Were Found.</div>
					</div>
				)}
			</div>
		</PageContainer>
	);
};

export default SearchResults;
