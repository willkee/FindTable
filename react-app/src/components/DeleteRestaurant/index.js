import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteRestaurantForm } from '../../Forms/DeleteRestaurantForm';
import { showModal, setCurrentModal } from '../../store/modal';
import styles from './UpdateRestaurant.module.css'


export const DeleteRestaurant = ({restaurant_id}) => {
    const dispatch = useDispatch()

    const showDeleteForm = () => {
        dispatch(setCurrentModal(() => (<DeleteRestaurantForm restaurant_id={restaurant_id} />)));
        dispatch(showModal());
      }

  return <button onClick={showDeleteForm} className={styles.update_button}>Delete Restaurant</button>;
};
