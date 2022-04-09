import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteRestaurantForm } from '../../Forms/DeleteRestaurantForm';
import { showModal, setCurrentModal } from '../../store/modal';
import styles from './DeleteRestaurant.module.css'


export const DeleteRestaurant = ({restaurant_id}) => {
    const dispatch = useDispatch()

    const showDeleteForm = () => {
        dispatch(setCurrentModal(() => (<DeleteRestaurantForm restaurant_id={restaurant_id} />)));
        dispatch(showModal());
      }

<<<<<<< HEAD
  return <div onClick={showDeleteForm} className={styles.update_button}>Delete Restaurant</div>;
=======
  return <div onClick={showDeleteForm} className={styles.button}>Delete Restaurant</div>;
>>>>>>> staging
};
