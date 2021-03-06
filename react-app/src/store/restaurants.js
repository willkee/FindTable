const CREATED_RESTAURANT = "/restaurants/createdRestaurant";
const ALL_RESTAURANTS_RECEIVED = "/restaurants/allRestaurantsReceived";

const ONE_RESTAURANT = "/restaurants/oneRestaurant";
const HOME_GRID_RESTAURANTS_RECEIVED = "/restaurants/homeRestaurantsOnly";

const UPDATED_RESTAURANT = "/restaurants/updatedRestaurant";
const DELETED_RESTAURANT = "/restaurants/deletedRestaurant";
const CREATED_REVIEW = "/reviews/createdReview";
const UPDATED_REVIEW = "/reviews/updatedReview";
const DELETED_REVIEW = "/reviews/deletedReview";

const CREATED_RESERVATION = "/reservations/createdReservation";
const UPDATED_RESERVATION = "/reservations/updatedReservation";
const DELETED_RESERVATION = "/reservations/deletedReservation";

//action creators for reservations
const createdReservation = (payload) => {
	return {
		type: CREATED_RESERVATION,
		payload,
	};
};

const updatedReservation = (payload) => {
	return {
		type: UPDATED_RESERVATION,
		payload,
	};
};

const deletedReservation = (payload) => {
	return {
		type: DELETED_RESERVATION,
		payload,
	};
};

//action creators for reviews
const createdReview = (payload) => {
	return {
		type: CREATED_REVIEW,
		payload,
	};
};

const updatedReview = (payload) => {
	return {
		type: UPDATED_REVIEW,
		payload,
	};
};

const deletedReview = (reviewId, restaurantId) => {
	return {
		type: DELETED_REVIEW,
		reviewId,
		restaurantId,
	};
};

//action creators for restaurants
const createdRestaurant = (payload) => {
	return {
		type: CREATED_RESTAURANT,
		payload,
	};
};

const allRestaurantsReceived = (payload) => {
	return {
		type: ALL_RESTAURANTS_RECEIVED,
		payload,
	};
};

// NEW CODE NEW CODE
// -----------------------------------------------------

const oneRestaurantReceived = (payload) => {
	return {
		type: ONE_RESTAURANT,
		payload,
	};
};

const homeRestaurantsReceived = (payload) => {
	return {
		type: HOME_GRID_RESTAURANTS_RECEIVED,
		payload,
	};
};

export const receiveHomeRestaurants = () => async (dispatch) => {
	const res = await fetch("/api/restaurants/home");
	if (res.ok) {
		const restaurants = await res.json();
		dispatch(homeRestaurantsReceived(Object.values(restaurants)[0]));
		return restaurants;
	}
};

export const receiveOneRestaurant = (restaurantId) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/${restaurantId}`);

	if (res.ok) {
		const restaurant = await res.json();
		dispatch(oneRestaurantReceived(restaurant));
		return restaurant;
	}
};

// -----------------------------------------------------
// NEW CODE NEW CODE

const updatedRestaurant = (payload) => {
	return {
		type: UPDATED_RESTAURANT,
		payload,
	};
};

const deletedRestaurant = (payload) => {
	return {
		type: DELETED_RESTAURANT,
		payload,
	};
};

//thunks for reservations
export const createReservation = (data) => async (dispatch) => {
	const res = await fetch("/api/my_reservations/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	const newReservation = await res.json();
	dispatch(createdReservation(newReservation));
	return newReservation;
};

export const updateReservation = (data) => async (dispatch) => {
	const res = await fetch(`/api/my_reservations/${data.reservation_id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	const editedReservation = await res.json();
	dispatch(updatedReservation(editedReservation));
	return editedReservation;
};

export const deleteReservation = (reservationId) => async (dispatch) => {
	const res = await fetch(`/api/my_reservations/${reservationId}`, {
		method: "DELETE",
	});

	const deleted = await res.json();
	dispatch(deletedReservation(deleted));
	return deleted;
};

//thunks for reviews
export const createReview = (data) => async (dispatch) => {
	const res = await fetch("/api/reviews/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	const newReview = await res.json();

	if (newReview.error) {
		return newReview.error;
	} else {
		await dispatch(createdReview(newReview));
		return newReview;
	}
};

export const updateReview = (data) => async (dispatch) => {
	const res = await fetch(`/api/reviews/${data.id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	const updated = await res.json();

	if (updated.errors) {
		return updated;
	} else {
		await dispatch(updatedReview(updated));
		return updated;
	}
};

export const deleteReview = (reviewId, restaurantId) => async (dispatch) => {
	const res = await fetch(`/api/reviews/${reviewId}/delete`, {
		method: "DELETE",
	});

	const removedReview = await res.json();
	await dispatch(deletedReview(removedReview.id, restaurantId));
	return removedReview;
};

//thunks for restaurants
export const createRestaurant = (data) => async (dispatch) => {
	const res = await fetch("/api/restaurants/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	const newRestaurant = await res.json();
	if (newRestaurant.errors) {
		return newRestaurant;
	} else {
		dispatch(createdRestaurant(newRestaurant));
		return newRestaurant;
	}
};

export const receiveAllRestaurants = () => async (dispatch) => {
	const res = await fetch("/api/restaurants/");
	if (res.ok) {
		const restaurants = await res.json();
		dispatch(allRestaurantsReceived(Object.values(restaurants)[0]));
		return restaurants;
	}
};

export const updateRestaurant =
	({ formData, id }) =>
	async (dispatch) => {
		const res = await fetch(`/api/restaurants/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const update = await res.json();
		if (update.errors) {
			return update;
		} else {
			dispatch(updatedRestaurant(update));
			return update;
		}
	};

export const deleteRestaurant = (restaurantId) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/${restaurantId}`, {
		method: "DELETE",
	});
	const removedRestaurant = await res.json();
	dispatch(deletedRestaurant(removedRestaurant));
	return removedRestaurant;
};

const restaurantsReducer = (state = {}, action) => {
	const newState = { ...state };

	switch (action.type) {
		case CREATED_RESTAURANT: {
			newState[action.payload?.id] = action.payload;
			return newState;
		}
		case ALL_RESTAURANTS_RECEIVED: {
			action.payload.forEach(
				(restaurant) => (newState[restaurant.id] = restaurant)
			);
			return newState;
		}
		case HOME_GRID_RESTAURANTS_RECEIVED: {
			action.payload.forEach(
				(restaurant) => (newState[restaurant.id] = restaurant)
			);
			return newState;
		}
		case ONE_RESTAURANT: {
			newState[action.payload.id] = action.payload;
			return newState;
		}
		case UPDATED_RESTAURANT: {
			newState[action.payload?.id] = action.payload;
			return newState;
		}
		case DELETED_RESTAURANT: {
			delete newState[action.payload.restaurant.id];
			return newState;
		}
		case CREATED_REVIEW: {
			const restaurant = newState[action.payload.restaurant_id];
			const reviews = restaurant.reviews;
			reviews[action.payload.id] = action.payload;
			return newState;
		}
		case UPDATED_REVIEW: {
			const restaurant = newState[action.payload.restaurant_id];
			const reviews = restaurant.reviews;
			reviews[action.payload.id] = action.payload;
			return newState;
		}
		case DELETED_REVIEW: {
			const restaurant = newState[action.restaurantId];
			const reviews = restaurant.reviews;
			delete reviews[action.reviewId];
			return newState;
		}
		case CREATED_RESERVATION: {
			console.log("SADJHASKJDHA", action.payload);
			const restaurant = newState[action.payload.restaurant_id];
			const reservations = restaurant.reservations;
			reservations[action.payload.id] = action.payload;
			return newState;
		}
		case UPDATED_RESERVATION: {
			const restaurant = newState[action.payload.restaurant_id];
			const reservations = restaurant.reservations;
			reservations[action.payload.id] = action.payload;
			return newState;
		}
		case DELETED_RESERVATION: {
			const restaurant =
				newState[action.payload.reservation.restaurant_id];
			const reservations = restaurant.reservations;
			delete reservations[action.payload.id];
			return newState;
		}
		default:
			return state;
	}
};

export default restaurantsReducer;
