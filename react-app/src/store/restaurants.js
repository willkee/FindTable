const CREATED_RESTAURANT = '/restaurants/createdRestaurant'
const ALL_RESTAURANTS_RECEIVED = '/restaurants/allRestaurantsReceived'
// const ONE_RESTAURANT_RECEIVED  = '/restaurants/oneRestaurantReceived'
const UPDATED_RESTAURANT = '/restaurants/updatedRestaurant'
const DELETED_RESTAURANT = '/restaurants/deletedRestaurant'



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
    const res = await fetch('/api/restaurants', {
      method: 'POST',
      headers: { 'Content_Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const newRestaurant = await res.json()
    dispatch(createdRestaurant(newRestaurant))
  }


export const receiveAllRestaurants = data =>
  async dispatch => {
    const res = await fetch('/api/restaurants')

    if (res.ok) {
      const restaurants = await res.json();
      dispatch(allRestaurantsReceived(restaurants))
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


export default restaurantsReducer = (state = {}, action) => {
  const newState = {...state};

  switch (action.type) {
    case CREATED_RESTAURANT: {
      newState[action.restaurant?.id] = action.restaurant
      return newState;
    }
    case ALL_RESTAURANTS_RECEIVED: {
      action.restaurants.forEach((restaurant) => newState[restaurant.id] = restaurant)
      return newState;
    }
    // case ONE_RESTAURANT_RECEIVED: {
    //   newState[action.restaurant?.id] = action.restaurant
    //   return newState;
    // }
    case UPDATED_RESTAURANT: {
      newState[action.restaurant?.id] = action.restaurant
      return newState;
    }
    case DELETED_RESTAURANT: {
      delete newState[action.restaurant?.id]
      return newState
    }
    default:
      return state;
  }
}