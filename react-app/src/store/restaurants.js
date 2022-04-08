const CREATED_RESTAURANT = '/restaurants/createdRestaurant'
const ALL_RESTAURANTS_RECEIVED = '/restaurants/allRestaurantsReceived'
const UPDATED_RESTAURANT = '/restaurants/updatedRestaurant'
const DELETED_RESTAURANT = '/restaurants/deletedRestaurant'
const CREATED_REVIEW = '/reviews/createdReview'
const UPDATED_REVIEW = '/reviews/updatedReview'
const DELETED_REVIEW ='/reviews/deletedReview'

// const CREATED_RESERVATION = '/reviews/createdReservation'
// const UPDATED_RESERVATION = '/reviews/updatedReview'
// const DELETED_RESERVATION ='/reviews/deletedReview'


//action creators for reviews
const createdReview = (payload) => {
  return {
    type: CREATED_REVIEW,
    payload
  }
}


const updatedReview = (payload) => {
  return {
    type: UPDATED_REVIEW,
    payload
  }
}


const deletedReview = (payload) => {
  return {
    type: DELETED_REVIEW,
    payload
  }
}


//action creators for restaurants
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


//thunks for reviews
export const createReview = data =>
async dispatch => {
  const res = await fetch('/api/reviews/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const newReview = await res.json()
  dispatch(createdReview(newReview))
  return newReview
}


export const updateReview = data =>
async dispatch => {
  const res = await fetch(`/api/reviews/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const updated = await res.json();
  dispatch(updatedReview(updated))
  return updated
}


export const deleteReview = reviewId =>
async dispatch => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })

  const removedReview = await res.json();
  dispatch(deletedReview(removedReview))
  return removedReview
}


//thunks for restaurants
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
    if (res.ok) {
      const restaurants = await res.json();
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
    case UPDATED_RESTAURANT: {
      newState[action.payload?.id] = action.payload
      return newState;
    }
    case DELETED_RESTAURANT: {
      delete newState[action.payload?.id]
      //double check the payload because it could already be an Id and id.id doesn't make sense
      return newState
    }
//     case CREATED_RESERVATION: {
//       newState[action.payload?.id] = action.payload
    case CREATED_REVIEW: {
      const restaurant = newState[action.payload.restaurant_id]
      const reviews = restaurant.review
      reviews[action.payload.id] = action.payload
      return newState
    }
    case UPDATED_REVIEW: {
      const restaurant = newState[action.payload.restaurant_id]
      const reviews = restaurant.reviews
      reviews[action.payload.id] = action.payload
      return newState
    }
    case DELETED_REVIEW: {
      const restaurant = newState[action.payload.restaurant_id]
      const reviews = restaurant.reviews
      delete reviews[action.payload.id]
      return newState
    }
    default:
      return state;
  }
}

export default restaurantsReducer
