
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import ProtectedRoute from './auth/ProtectedRoute'

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/restaurants' exact={true} activeClassName='active'>
            Restaurants
          </NavLink>
        </li>
        <ProtectedRoute>
          <li>
            <LogoutButton />
          </li>
        </ProtectedRoute>
      </ul>
    </nav>
  );
}

export default NavBar;
