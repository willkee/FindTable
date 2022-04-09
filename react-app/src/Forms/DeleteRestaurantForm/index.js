import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../store/modal';
import animation from "../../video/FindTable-loading.mp4";
import { deleteRestaurant } from '../../store/restaurants';
import { useHistory } from 'react-router-dom';

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
    console.log('FRONT ID--', restaurant_id)
    await dispatch(hideModal())
    await history.push(`/`)
    await dispatch(deleteRestaurant(restaurant_id))
  };

  return (
    <div>
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
        <div>
          <h2>Are you sure you want to Delete your Restaurant?</h2>
          <p>This will delete all of its information.</p>
          <div>
            <button type='submit' onClick={handleSubmit}>Yes</button>
            <button type='submit' onClick={closeModal}>Cancel</button>
          </div>
        </div>
    </div>
  );
};
