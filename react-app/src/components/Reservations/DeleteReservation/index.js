import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteReservationForm } from '../../../Forms/DeleteReservationForm';
import { showModal, setCurrentModal } from '../../../store/modal';
import styles from './DeleteReservation.module.css'


export const DeleteReservation = ({reservationId}) => {
    const dispatch = useDispatch()

    const showDeleteForm = () => {
        dispatch(setCurrentModal(() => (<DeleteReservationForm reservationId={reservationId} />)));
        dispatch(showModal());
      }

  return <div type="button" onClick={showDeleteForm} className={styles.button}>Cancel</div>;
};
