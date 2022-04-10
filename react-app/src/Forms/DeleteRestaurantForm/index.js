import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../store/modal';
import animation from "../../video/FindTable-loading.mp4";
import { deleteRestaurant } from '../../store/restaurants';
import { useHistory } from 'react-router-dom';
import styles from './DeleteRestaurantForm.module.css'

export const DeleteRestaurantForm = ({restaurant_id}) => {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory()

  const closeModal = async (e) => {
    e.preventDefault();
    await dispatch(hideModal())
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(hideModal())
    await history.push(`/`)
    await dispatch(deleteRestaurant(restaurant_id))
    setErrors([])
  };

  return (
    <div className={styles.main_container}>
      <video loop autoPlay width="250">
        <source src={animation}
          type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className={styles.text_container}>
          <h2>Are you sure you want to Delete your Restaurant?</h2>
          <h3>This will delete all of its information from our records.</h3>
          <div className={styles.button_container}>
            <div role='button' onClick={handleSubmit} className={styles.button}>Delete</div>
            <div role='button' onClick={closeModal} className={styles.button}>Cancel</div>
          </div>
        </div>
    </div>
  );
};
