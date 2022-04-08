import React from 'react';
import { useDispatch } from 'react-redux';
import { RestaurantForm } from '../../Forms/RestaurantForm';
import { showModal, setCurrentModal } from '../../store/modal';
import styles from './UpdateRestaurant.module.css'

export const UpdateRestaurant = ({restaurant}) => {
    const dispatch = useDispatch()
    const showRestaurantForm = () => {
        dispatch(setCurrentModal(() => (<RestaurantForm restaurant={restaurant} />)));
        dispatch(showModal());
      }

  return <button onClick={showRestaurantForm} className={styles.update_button}>Update Restaurant</button>;
};
