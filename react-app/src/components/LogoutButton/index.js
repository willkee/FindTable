import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import styles from './Logout.module.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async () => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} className={styles.logout_button}>Sign out</button>;
};

export default LogoutButton;
