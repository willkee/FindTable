import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'


import NavBar from './components/Navbar/';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User'
import Modal from './components/Modal/Modal';
import UsersList from './components/UsersList';
import RestaurantsList from './components/RestaurantsList';
import ProfilePage from './components/ProfilePage';
import SearchResults from './components/SearchResults';
import { Homepage } from './components/Homepage';
// import { Footer } from "./components/Footer"
import { SingleRestaurant } from './components/SingleRestaurant';
import { PageWrapper } from '../src/components/PageWrapper';

import { NewRestaurant } from './Forms/RestaurantForm';

import { receiveAllRestaurants } from './store/restaurants';
import { allUsers } from './store/users';
import { retrieveSettings } from './store/settings';
import { authenticate } from './store/session';
import { retrieveCusines } from './store/cuisines';

import LoginForm from './components/auth/LoginForm';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  // const users = useSelector(state => Object.values(state.users))
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
      // await dispatch(allUsers())
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
          <NavBar />
          <Modal />
          <Switch>
            <Route exact path='/'>
              <Homepage />
              <RestaurantsList all_restaurants={all_restaurants} />
            </Route>
            <Route exact path="/login">
              <LoginForm />
            </Route>
            <ProtectedRoute exact path="/new-restaurant">
              <NewRestaurant all_settings={all_settings} all_cuisines={all_cuisines}/>
            </ProtectedRoute>
            <Route exact path="/restaurants/:id">
              <SingleRestaurant />
            </Route>
            {/* <ProtectedRoute path='/reservations' exact={true} >
              <Reservations/>
            </ProtectedRoute> */}
            {/* <ProtectedRoute exact path='/users'>
              <UsersList users={users} />
              </ProtectedRoute> */}
              <ProtectedRoute exact path='/users/:userId'>
                <User />
              </ProtectedRoute>
              <ProtectedRoute exact path="/my-profile">
                <ProfilePage />
              </ProtectedRoute>
              <Route exact path='/search/:dateString/:timeParams/:searchWord'>
                <SearchResults />
              </Route>
            </Switch>
            <div className='return_to_top_button'><a href="#top"><i className="fa-solid fa-angles-up"></i></a></div>
            {/* <Footer /> */}
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;
