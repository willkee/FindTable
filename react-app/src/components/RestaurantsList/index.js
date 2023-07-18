import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./RestaurantsList.module.css";
import imgError from "../../utils/imgError";

const RestaurantsList = ({ all_restaurants }) => {
	const history = useHistory();
	const joinSettings = (restaurant) => {
		let joined = "|";
		restaurant?.settings?.map(
			(setting) => (joined = ` ${joined} ${setting.type} `)
		);
		return joined;
	};
	const joinCuisines = (restaurant) => {
		let joined = "|";
		restaurant?.cuisines?.map(
			(cuisine) => (joined = ` ${joined} ${cuisine.type} `)
		);
		return joined;
	};

	const goToRestaurant = (id) => {
		history.push(`/restaurants/${id}`);
		return;
	};



	return (
		<div className={styles.container}>
			<div className={styles.all_container}>
				{all_restaurants.map((restaurant) => (
					<div
						onClick={() => goToRestaurant(restaurant.id)}
						className={styles.each_container}
						key={restaurant.id}
					>
						<div className={styles.card_img}>
							<img src={restaurant.img_url}
							onError={({ currentTarget }) => imgError(currentTarget)}
							alt="restaurant"
							/>
						</div>
						<div className={styles.info}>
							<h3>
								{restaurant?.name?.length > 20
									? restaurant?.name?.slice(0, 20) + "..."
									: restaurant?.name}
							</h3>
							<div className={styles.borough_price}>
								<span>
									<i className="fa-solid fa-city"></i>
									{restaurant.borough}
								</span>
								<span>{`${
									restaurant.price_rating === 4
										? "$$$$"
										: restaurant.price_rating === 3
										? "$$$"
										: restaurant.price_rating === 2
										? "$$"
										: "$"
								}`}</span>
							</div>

							<div className={styles.categories}>
								<span>
									{restaurant.accessible ? (
										<i className="fa-brands fa-accessible-icon"></i>
									) : (
										""
									)}
								</span>
								<span>{joinSettings(restaurant)}</span>
								<span>{joinCuisines(restaurant)}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RestaurantsList;
