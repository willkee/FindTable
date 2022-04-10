import React from 'react';
import { useSelector } from 'react-redux';


export const RestaurantReservations = () => {
  const myRestaurants = useSelector(state => state.session.user.restaurants)

  return (
    <h1>rest res</h1>
  )
}
