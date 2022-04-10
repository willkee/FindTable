import React from 'react';
import { useSelector } from 'react-redux';
import styles from './RestaurantReviews.module.css';

export const RestaurantReviews = () => {
  const myRestaurants = useSelector(state => Object.values(state.session.user.restaurants))


  return (
    <>
    <h1>Hello from profile page reviews</h1>
    <div className={styles.restaurantContainer}>
      {myRestaurants.map((restaurant) => (
        <>
        <h3>{restaurant.name}</h3>
        <div className={styles.reviewsContainer}>
          {Object.values(restaurant.reviews).map(() => {
            <div>
              
            </div>
          })}
        </div>
        </>
      ))}
    </div>
    </>
  )
}
