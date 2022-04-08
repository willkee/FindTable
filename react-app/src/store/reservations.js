// const CREATED_RESERVATION = '/reviews/createdReservation'
// // const RECEIVED_REVIEWS = '/reviews/receivedReviews'
// const UPDATED_RESERVATION = '/reviews/updatedReview'
// const DELETED_RESERVATION ='/reviews/deletedReview'


// const createdReservation = (payload) => {
//   return {
//     type: CREATED_RESERVATION,
//     payload
//   }
// }

// const updatedReservation = (payload) => {
//   return {
//     type: UPDATED_RESERVATION,
//     payload
//   }
// }

// const deletedReservation = (payload) => {
//   return {
//     type: DELETED_RESERVATION,
//     payload
//   }
// }


// //thunks
// export const createReservation = data =>
// async dispatch => {
//   const res = await fetch('/api/my_reservations/', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   })
//   const newReservation = await res.json()
//   dispatch(createdReservation(newReservation))
//   return newReservation
// }

// export const updateReservation = data =>
// async dispatch => {
//   const res = await fetch(`/api/my_reservations/${data.id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   })

//   const updatedReservation = await res.json();
//   dispatch(updatedReservation(updatedReservation))
//   return updatedReservation
// }

// export const deleteReservation = reservationId =>
// async dispatch => {
//   const res = await fetch(`/api/my_reservations/${reservationId}`, {
//     method: 'DELETE'
//   })

//   const deletedReservation = await res.json();
//   dispatch(deletedReservation(deletedReservation))
//   return deletedReservation
// }


// //reducer
// const reservationsReducer = (state = {}, action) => {
//   const newState = {...state}

//   switch (action.type) {
//     case CREATED_RESERVATION: {
//       newState[action.payload?.id] = action.payload
//       return newState;
//     }
//     case UPDATED_RESERVATION: {
//       newState[action.payload?.id] = action.payload
//       return newState;
//     }
//     case DELETED_RESERVATION: {
//       delete newState[action.payload?.id]
//       return newState
//     }
//     default:
//     return state;
//   }
// }



// export default reservationsReducer
