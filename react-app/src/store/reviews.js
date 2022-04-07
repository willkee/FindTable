const CREATED_REVIEW = '/reviews/createdReview'
const RECEIVED_REVIEWS = '/reviews/receivedReviews'
const UPDATED_REVIEW = '/reviews/updatedReview'
const DELETED_REVIEW ='/reviews/deletedReview'


const createdReview = (payload) => {
  return {
    type: CREATED_REVIEW,
    payload
  }
}


const receivedReviews = (payload) => {
  return {
    type: RECEIVED_REVIEWS,
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


//thunks
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


export const receiveReviews = () =>
async dispatch => {
  const res = await fetch('/api/reviews/')
  if (res.ok) {
    const reviews = await res.json()
    dispatch(receivedReviews(Object.values(reviews)[0]))
    return reviews
  }
}


export const updateReview = reviewId =>
async dispatch => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
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


//reducer
const reviewsReducer = (state = {}, action) => {
  const newState = {...state}

  switch (action.type) {
    case CREATED_REVIEW: {
      newState[action.payload?.id] = action.payload
      return newState;
    }
    case RECEIVED_REVIEWS: {
      action.payload.forEach((review) => newState[review.id] = review)
      return newState;
    }
    case UPDATED_REVIEW: {
      newState[action.payload?.id] = action.payload
      return newState;
    }
    case DELETED_REVIEW: {
      delete newState[action.payload?.id]
      return newState
    }
    default:
    return state;
  }
}



export default reviewsReducer
