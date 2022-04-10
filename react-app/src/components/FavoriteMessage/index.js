import React from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../store/modal';
import styles from './FavoriteMessage.module.css'

export const FavoriteMessage = ({favToggle}) => {
  const dispatch = useDispatch();

  const closeModal = async (e) => {
    await dispatch(hideModal())
  };
  setTimeout(() => {closeModal()}, 1000)
  return (
    <div className={styles.main_container}>
        <div className={styles.text_container}>
          {!favToggle ? <h3>Added to Favorites!</h3> : <h3>Removed from Favorites!</h3> }
        </div>
    </div>
  );
};
