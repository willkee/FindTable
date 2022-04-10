import React from 'react';
import { useSelector } from 'react-redux';

export const MyReviews = () => {
  const myRev = useSelector(state => state.session.user.reviews)

  return (
    <h1>my reviews</h1>
  )
}
