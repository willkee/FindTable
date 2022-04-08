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
import SearchSection from '../SearchSection';

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

  const showSearchForm = () => {
    dispatch(setCurrentModal(SearchSection));
    dispatch(showModal())
  }

  if (sessionUser) {
    return (
    <nav className={styles.container}>
        <div className={styles.logo}>
          <NavLink to='/' exact={true} className={styles.home_link} activeClassName='active'>
            <Logo /> <span>FindTable</span>
          </NavLink>
        </div>
        <div className={styles.right_logged_in}>
            <div>
              <div className={styles.profile_icon}>
                <ProfileDropdown />
              </div>
              <div className={styles.calendar_icon}>
                <CalendarDropdown />
              </div>
              <div>
                <GreyVerticalLine />
              </div>
            </div>
            <div className={styles.search_icon} onClick={showSearchForm}>
              <MagnifyingGlass/>
            </div>
        </div>
    </nav>
    )
  } else {
    return (
     <nav className={styles.container}>
        <div className={styles.logo}>
          <NavLink to='/' exact={true} className={styles.home_link} activeClassName='active'>
            <Logo /> <span>FindTable</span>
          </NavLink>
        </div>
        <div className={styles.right}>

            <div>
              <div className={styles.signin} onClick={showLoginForm}>Log In</div>
            </div>
            <div>
              <div className={styles.signup} onClick={showSignUpForm}>Sign Up</div>
            </div>

            <div>
                <GreyVerticalLine />
            </div>
            <div className={styles.search_icon} onClick={showSearchForm}>
              <MagnifyingGlass/>
            </div>
        </div>
    </nav>
    )
  }
}

export default NavBar;
