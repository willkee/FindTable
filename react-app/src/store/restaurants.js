const CREATED_RESTAURANT = '/restaurants/createdRestaurant'
const ALL_RESTAURANTS_RECEIVED = '/restaurants/allRestaurantsReceived'
// const ONE_RESTAURANT_RECEIVED  = '/restaurants/oneRestaurantReceived'
const UPDATED_RESTAURANT = '/restaurants/updatedRestaurant'
const DELETED_RESTAURANT = '/restaurants/deletedRestaurant'

const CREATED_RESERVATION = '/reviews/createdReservation'
const UPDATED_RESERVATION = '/reviews/updatedReview'
const DELETED_RESERVATION ='/reviews/deletedReview'

const createdReservation = (payload) => {
  return {
    type: CREATED_RESERVATION,
    payload
  }
}

const updatedReservation = (payload) => {
  return {
    type: UPDATED_RESERVATION,
    payload
  }
}

const deletedReservation = (payload) => {
  return {
    type: DELETED_RESERVATION,
    payload
  }
}

export const createReservation = data =>
async dispatch => {
  const res = await fetch('/api/my_reservations/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const newReservation = await res.json()
  dispatch(createdReservation(newReservation))
  return newReservation
}

export const updateReservation = data =>
async dispatch => {
  const res = await fetch(`/api/my_reservations/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const updatedReservation = await res.json();
  dispatch(updatedReservation(updatedReservation))
  return updatedReservation
}

export const deleteReservation = reservationId =>
async dispatch => {
  const res = await fetch(`/api/my_reservations/${reservationId}`, {
    method: 'DELETE'
  })

  const deletedReservation = await res.json();
  dispatch(deletedReservation(deletedReservation))
  return deletedReservation
}

//action creators
const createdRestaurant = (payload) => {
  return {
    type: CREATED_RESTAURANT,
    payload
  }
}

const allRestaurantsReceived = (payload) => {
  return {
    type: ALL_RESTAURANTS_RECEIVED,
    payload
  }
}

// const oneRestaurantReceived = (payload) => {
//   return {
//     type: ONE_RESTAURANT_RECEIVED,
//     payload
//   }
// }

const updatedRestaurant = (payload) => {
  return {
    type: UPDATED_RESTAURANT,
    payload
  }
}

const deletedRestaurant = (payload) => {
  return {
    type: DELETED_RESTAURANT,
    payload
  }
}


//thunks
export const createRestaurant = data =>

  async dispatch => {
    const res = await fetch('/api/restaurants/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const newRestaurant = await res.json()
    dispatch(createdRestaurant(newRestaurant))
    return newRestaurant
  }


export const receiveAllRestaurants = () => async dispatch => {
    const res = await fetch('/api/restaurants/')
  // console.log("SDFJHSKFHSDKUFHSD*F(&HSDF*&HSDF")
    if (res.ok) {
      const restaurants = await res.json();
      // console.log("\n\n\n\n\n\nRESTAURANTS", restaurants, "\n\n\n\n\n")
      // const restaurant_array = Object.values(restaurants)
      dispatch(allRestaurantsReceived(Object.values(restaurants)[0]))
      return restaurants
    }
  }

// export const receiveOneRestaurant = restaurantId =>
//   async dispatch => {
//     const res = await fetch(`api/restaurants/${restaurantId}`)

//     if (res.ok) {
//       const restaurant = await res.json();
//       dispatch(oneRestaurantReceived(restaurant));
//       return restaurant
//     }
//   }

export const updateRestaurant = updatedRest =>
  async dispatch => {
    const res = await fetch(`/api/restaurants/${updatedRest.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRest)
    })

    const updated = await res.json();
    dispatch(updatedRestaurant(updated))
    return updated
  }

export const deleteRestaurant = restaurantId =>
  async dispatch => {
    const res = await fetch(`/api/restaurants/${restaurantId}`,{
      method: 'DELETE'
    })

    const removedRestaurant = await res.json();
    dispatch(deletedRestaurant(removedRestaurant))
    return removedRestaurant
  }


const restaurantsReducer = (state = {}, action) => {
  const newState = {...state};

  switch (action.type) {
    case CREATED_RESTAURANT: {
      newState[action.payload?.id] = action.payload
      return newState;
    }
    case ALL_RESTAURANTS_RECEIVED: {
      action.payload.forEach((restaurant) => newState[restaurant.id] = restaurant)
      return newState;
    }
    // case ONE_RESTAURANT_RECEIVED: {
    //   newState[action.restaurant?.id] = action.restaurant
    //   return newState;
    // }
    case UPDATED_RESTAURANT: {
      newState[action.payload?.id] = action.payload
      return newState;
    }
    case DELETED_RESTAURANT: {
      delete newState[action.payload?.id]
      //double check the payload because it could already be an Id and id.id doesn't make sense
      return newState
    }
    case CREATED_RESERVATION: {
      newState[action.payload?.id] = action.payload
      return newState
    }
    default:
      return state;
  }
}

export default restaurantsReducer
