import React from 'react';
import { NavLink } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute'
import styles from './Navbar.module.css'
import {MagnifyingGlass, GreyVerticalLine} from '../Icons'
import { useDispatch } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
import ProfileDropdown from '../ProfileDropdown';
import CalendarDropdown from '../CalendarDropdown';

import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';

import { showModal, setCurrentModal } from '../../store/modal';

const NavBar = () => {
  // const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch()

  const showLoginForm = () => {
    dispatch(setCurrentModal(LoginForm));
    dispatch(showModal());
  }

  const showSignUpForm = () => {
    dispatch(setCurrentModal(SignUpForm));
    dispatch(showModal());
  }

  return (
    <nav className={styles.container}>
        <div className={styles.logo}>
          <NavLink to='/' exact={true} className={styles.home_link} activeClassName='active'>
            FindTable
          </NavLink>
        </div>
        <div className={styles.right}>
          <div>
            <div onClick={showLoginForm}>Log In</div>
          </div>
          <div>
            <div onClick={showSignUpForm}>Sign Up</div>
          </div>
          {/* {!sessionUser && <>
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
          } */}
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
