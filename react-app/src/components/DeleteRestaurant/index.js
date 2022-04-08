import React from 'react';
import { useDispatch } from 'react-redux';
import { RestaurantForm } from '../../Forms/RestaurantForm';
import { showModal, setCurrentModal } from '../../store/modal';
import styles from './UpdateRestaurant.module.css'

export const DeleteRestaurant = () => {
    const dispatch = useDispatch()

    const showDeleteForm = () => {
        dispatch(setCurrentModal(DeleteRestaurantForm));
        dispatch(showModal());
      }

  return <button onClick={showDeleteForm} className={styles.update_button}>Delete Restaurant</button>;
};
