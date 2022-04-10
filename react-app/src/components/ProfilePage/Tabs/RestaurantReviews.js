import React from 'react';
import { useSelector } from 'react-redux';

export const RestaurantReviews = () => {
  const myRestaurants = useSelector(state => state.session.user.restaurants)

  return (
    <h1>rest reviews</h1>
  )
}
