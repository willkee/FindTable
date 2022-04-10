import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";

import NavBar from "./components/Navbar/";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import Modal from "./components/Modal/Modal";
import UsersList from "./components/UsersList";
import ProfilePage from "./components/ProfilePage";
import SearchResults from "./components/SearchResults";
import { Homepage } from "./components/Homepage";
import { Footer } from "./components/Footer";
import { SingleRestaurant } from "./components/SingleRestaurant";
import { PageWrapper } from "../src/components/PageWrapper";
import { CreateRestaurant } from "./components/CreateRestaurant";
import ErrorPage from "./components/ErrorPage";
import { MyReservations } from './components/Pages/MyReservations';
// import { receiveAllRestaurants } from './store/restaurants';
import { allUsers } from "./store/users";
import { retrieveSettings } from "./store/settings";
import { authenticate } from "./store/session";
import { retrieveCusines } from "./store/cuisines";
import { receiveHomeRestaurants } from "./store/restaurants";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	const users = useSelector((state) => Object.values(state.users));
	const all_restaurants = useSelector((state) =>
		Object.values(state.restaurants)
	);
	// const all_settings = useSelector(state => Object.values(state.settings))
	// const all_cuisines = useSelector(state => Object.values(state.cuisines))
	// const reviews = useSelector(state => Object.values(state.reviews))
	// const reservations = useSelector(state => Object.values(state.reservations))
	// const favorites = useSelector(state => Object.values(state.favorites))

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			await dispatch(receiveHomeRestaurants());
			await dispatch(allUsers());
			await dispatch(retrieveSettings());
			await dispatch(retrieveCusines());
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
					<Route exact path="/">
						<Homepage all_restaurants={all_restaurants} />
					</Route>
					<Route exact path="/restaurants/:id">
						<SingleRestaurant />
					</Route>
					<ProtectedRoute exact path="/new-restaurant">
						<CreateRestaurant />
					</ProtectedRoute>
					{/* <ProtectedRoute path='/reservations' exact={true} >
            <Reservations/>
          </ProtectedRoute>  */}
					<ProtectedRoute exact path="/users">
						<UsersList users={users} />
					</ProtectedRoute>
					<ProtectedRoute exact path="/users/:userId">
						<User />
					</ProtectedRoute>
					<ProtectedRoute exact path="/my-profile">
						<ProfilePage />
					</ProtectedRoute>
					<ProtectedRoute exact path="/my_reservations/:id">
						<h1>Hello</h1>
					</ProtectedRoute>
					<Route exact path="/search/:searchWord">
						<SearchResults />
					</Route>
					<Route>
						<ErrorPage />
					</Route>
				</Switch>
				<div className="return_to_top_button">
					<a href="#top">
						<i className="fa-solid fa-angles-up"></i>
					</a>
				</div>
				<Footer />
			</PageWrapper>
		</BrowserRouter>
	);

}

export default App;
