import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import ProtectedRoute from '../auth/ProtectedRoute'
import styles from './Navbar.module.css'
import {MagnifyingGlass, Calendar, UserProfileIcon, GreyVerticalLine} from '../Icons'
import { useSelector } from 'react-redux';
import ProfileDropdown from '../ProfileDropdown';
import CalendarDropdown from '../CalendarDropdown';


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);


  return (
    <nav className={styles.container}>
        <div className={styles.logo}>
          <NavLink to='/' exact={true} className={styles.home_link} activeClassName='active'>
            FindTable
          </NavLink>
        </div>
        <div className={styles.right}>
          {!sessionUser && <>
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
          </>
          }
          <ProtectedRoute>
            <div>
              <ProfileDropdown />
            </div>
            <div>
              <CalendarDropdown />
            </div>
            <div>
              <GreyVerticalLine />
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
