import React from "react";
import { useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import styles from './Favorites.module.css';


export const Favorites = () => {
	const myFavorites = useSelector(state => Object.values(state.session.user.favorites).map((restaurant) => (restaurant.id)))
  const restaurantState = useSelector(state => state.restaurants)
  const history = useHistory()

  const restaurantPage = (id) => {
    history.push(`/restaurants/${id}`)
  }

	return (
    <>
      <h1>Your favorite restaurants</h1>
      <div className={styles.allFavorites}>
        {myFavorites?.map((id) => (
          <>
          <div className={styles.singleFavorite} onClick={() => restaurantPage(restaurantState[`${id}`].id)}>
            <div className={styles.restaurantName}>
              {restaurantState[`${id}`].name}
            </div>
            <div>
              <img src={restaurantState[`${id}`].img_url}/>
            </div>
          </div>
          </>
        ))}
      </div>
    </>
  )
};
