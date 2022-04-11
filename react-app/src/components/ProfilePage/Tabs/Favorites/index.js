import React from "react";
import { useSelector } from "react-redux";

export const Favorites = () => {
	const myFavorites = useSelector(state => state.session.user.favorites)

	return (
    <>
      <h1>Your favorite restaurants</h1>
      <div>
        
      </div>
    </>
  )
};
