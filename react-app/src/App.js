import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar/';
import ProtectedRoute from './components/auth/ProtectedRoute';

import User from './components/User'

import UsersList from './components/UsersList';
import RestaurantsList from './components/RestaurantsList';
import { NewRestaurant } from './Forms/RestaurantForm';
import ProfilePage from './components/ProfilePage';

import { receiveAllRestaurants } from './store/restaurants';
import { allUsers } from './store/users';
import { retrieveSettings } from './store/settings';
import { Homepage } from './components/Homepage';
import { PageWrapper } from '../src/components/PageWrapper';
import { InnerWrapper } from '../src/components/InnerWrapper';
import { authenticate } from './store/session';
import { retrieveCusines } from './store/cuisines';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const users = useSelector(state => Object.values(state.users))
  const all_restaurants = useSelector(state => Object.values(state.restaurants))
  const all_settings = useSelector(state => Object.values(state.settings))
  const all_cuisines = useSelector(state => Object.values(state.cuisines))
  //const reviews = useSelector(state => Object.values(state.reviews))
  //const reservations = useSelector(state => Object.values(state.reservations))
  //const favorites = useSelector(state => Object.values(state.favorites))

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(receiveAllRestaurants())
      await dispatch(allUsers())
      await dispatch(retrieveSettings())
      await dispatch(retrieveCusines())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <PageWrapper>
        <InnerWrapper>
          <NavBar />
          <Switch>
            <Route path='/' exact={true} >
              <Homepage />
            </Route>
            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>
            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route>
            {/* <Route exact path="/restaurants">
              <Restaurants all_restaurants={all_restaurants} />
            </Route>
            <Route exact path="/restaurants/:id">
              <SingleRestaurant all_restaurants={all_restaurants} />
            </Route> */}
            <ProtectedRoute exact path="/restaurants/new">
              <NewRestaurant all_settings={all_settings} all_cuisines={all_cuisines}/>
            </ProtectedRoute>
            {/* <ProtectedRoute path='/reservations' exact={true} >
              <Reservations/>
            </ProtectedRoute> */}
            <ProtectedRoute path='/users' exact={true} >
              <UsersList users={users} />
              </ProtectedRoute>
              <ProtectedRoute path='/users/:userId' exact={true} >
                <User />
              </ProtectedRoute>
              <ProtectedRoute exact path="/restaurants">
              <RestaurantsList all_restaurants={all_restaurants} />
              </ProtectedRoute>
              {/* <ProtectedRoute exact path="/restaurants/new">
                <NewRestaurantForm all_settings={all_settings} all_cuisines={all_cuisines}/>
              </ProtectedRoute> */}
              <ProtectedRoute exact path="/my-profile">
                <ProfilePage />
              </ProtectedRoute>
              <Route exact path='/' >
                <Homepage />
              </Route>
            </Switch>
        </InnerWrapper>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;
