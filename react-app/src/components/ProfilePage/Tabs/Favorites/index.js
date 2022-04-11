import React from "react";
import { useSelector } from "react-redux";
import styles from './Favorites.module.css';

export const Favorites = () => {
	const myFavorites = useSelector(state => Object.values(state.session.user.favorites).map((restaurant) => (restaurant.id)))
  const restaurantState = useSelector(state => state.restaurants)

	return (
    <>
      <h1>Your favorite restaurants</h1>
      <div className={styles.eachFavorite}>
        {myFavorites.map((id) => (
          <>
          {restaurantState[`${id}`].name}
          </>
        ))}
      </div>
    </>
  )
};
