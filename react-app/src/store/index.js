import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session'
import modals from './modal'
import userReducer from './users';
import restaurantsReducer from './restaurants';
import settingsReducer from './settings';
import cuisinesReducer from './cuisines';
// import reviewsReducer from './reviews';

const rootReducer = combineReducers({
  session: sessionReducer,
  users: userReducer,
  restaurants: restaurantsReducer,
  settings: settingsReducer,
  cuisines: cuisinesReducer,
  // reviews: reviewsReducer,
  modals
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
