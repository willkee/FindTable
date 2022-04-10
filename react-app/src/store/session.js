// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const ADD_FAVORITE = 'session/ADD_FAVORITE';
const REMOVE_FAVORITE = 'session/REMOVE_FAVORITE';


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const addedFavorite = (newFavorite) => ({
  type: ADD_FAVORITE,
  payload: newFavorite
});

const removedFavorite = (removedFavorite) => ({
  type: REMOVE_FAVORITE,
  payload: removedFavorite
});

export const addFavorite = id =>
  async dispatch => {
    const res = await fetch('/api/favorites/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
    })
    const newFavorite = await res.json()
    dispatch(addedFavorite(newFavorite))
    return newFavorite
  }

export const removeFavorite = id =>
  async dispatch => {
    const res = await fetch('/api/favorites/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
    })
    const favorite = await res.json()
    dispatch(removedFavorite(favorite))
    return favorite
  }

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (firstName, lastName, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function sessionReducer(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case ADD_FAVORITE:
      newState.user.favorites[action.payload.restaurant_id] = action.payload
      return newState
    case REMOVE_FAVORITE:
      delete newState.user.favorites[action.payload.restaurant_id]
      return newState
    default:
      return state;
  }
}
