import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ProtectedRoute from '../auth/ProtectedRoute'
import styles from './navbar.module.css'
import {MagnifyingGlass, Calendar, UserProfileIcon, GreyVerticalLine} from '../Icons'



const NavBar = () => {
  return (
    <nav className={styles.wrapper}>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
        <div className={styles.right}>
          <div>
            <UserProfileIcon />
          </div>
          <div>
            <Calendar />
          </div>
          <div>
            <GreyVerticalLine />
          </div>
          <div>
            <MagnifyingGlass />
          </div>
        </div>
        <ProtectedRoute>
          <div>
            <LogoutButton />
          </div>
        </ProtectedRoute>

    </nav>
  );
}

export default NavBar;