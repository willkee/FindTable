import React from 'react';
import { NavLink } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute'
import styles from './Navbar.module.css'
import {MagnifyingGlass, GreyVerticalLine} from '../Icons'
import { useSelector, useDispatch } from 'react-redux';
import ProfileDropdown from '../ProfileDropdown';
import CalendarDropdown from '../CalendarDropdown';
import { Logo } from '../Logo';

import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';

import { showModal, setCurrentModal } from '../../store/modal';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
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
            <Logo /> <span>FindTable</span>
          </NavLink>
        </div>
        <div className={styles.right}>
          {!sessionUser &&
          <>
            <div>
              <div className={styles.signin} onClick={showLoginForm}>Log In</div>
            </div>
            <div>
              <div className={styles.signup} onClick={showSignUpForm}>Sign Up</div>
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
            <div className={styles.search_icon}>
              <MagnifyingGlass/>
            </div>
        </div>

    </nav>
  );
}

export default NavBar;
