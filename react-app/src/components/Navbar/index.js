import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import ProtectedRoute from '../auth/ProtectedRoute'
import styles from './Navbar.module.css'
import {MagnifyingGlass, Calendar, UserProfileIcon, GreyVerticalLine} from '../Icons'
import { useSelector } from 'react-redux';
import Profile from '../Profile';


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);


  return (
    <nav className={styles.container}>
        <div className={styles.logo}>
          <NavLink to='/' exact={true} activeClassName='active'>
            Logo
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
              <Profile />
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
