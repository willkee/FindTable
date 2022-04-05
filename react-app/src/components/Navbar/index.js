import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ProtectedRoute from '../auth/ProtectedRoute'
import styles from './navbar.module.css'
import {MagnifyingGlass, Calendar, UserProfileIcon, GreyVerticalLine} from '../Icons'



const NavBar = () => {


  return (
    <nav className={styles.container}>
        <div className={styles.logo}>
          <NavLink to='/' exact={true} activeClassName='active'>
            Logo
          </NavLink>
        </div>
        <div className={styles.right}>
          <div className={styles.signup}>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign up
            </NavLink>
          </div>
          <div className={styles.signin}>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Sign in
            </NavLink>
          </div>
          <ProtectedRoute>
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
              <LogoutButton />
            </div>
          </ProtectedRoute>
            <div>
              <MagnifyingGlass />
            </div>
        </div>

    </nav>
  );
}

export default NavBar;
