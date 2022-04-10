import React from 'react';
import { useSelector } from 'react-redux';

export const MyReservations = () => {
  const myRes = useSelector(state => state.session.user.reservations)

  return (
    <h1>my res</h1>
  )
}
