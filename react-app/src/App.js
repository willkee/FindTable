import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import RestaurantsList from './components/RestaurantsList';
import { receiveAllRestaurants } from './store/restaurants';
import { allUsers } from './store/users';
import NewRestaurantForm from './components/auth/NewRestaurantForm';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const users = useSelector(state => Object.values(state.users))
  const all_restaurants = useSelector(state => Object.values(state.restaurants))

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(receiveAllRestaurants())
      await dispatch(allUsers())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute exact path='/users' >
          <UsersList users={users} />
        </ProtectedRoute>
        <ProtectedRoute exact path='/users/:userId' >
          <User />
        </ProtectedRoute>
        <ProtectedRoute exact path="/restaurants">
          <RestaurantsList all_restaurants={all_restaurants} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/restaurants/new">
          <NewRestaurantForm />
        </ProtectedRoute>
        <ProtectedRoute exact path='/' >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
