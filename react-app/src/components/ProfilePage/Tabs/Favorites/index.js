import React from 'react';
import { useSelector } from 'react-redux';

export const Favorites = () => {
  const myFavorites = useSelector(state => state.session.user.favorites)

  return (
    <h1>favorites</h1>
  )
}
