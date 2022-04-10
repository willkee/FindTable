import React from 'react';
import { useDispatch } from 'react-redux';
import { UpdateReservationForm } from '../../../Forms/UpdateReservationForm';
import { showModal, setCurrentModal } from '../../../store/modal';
import styles from './UpdateReservation.module.css'


export const UpdateReservation = ({reservation}) => {
    const dispatch = useDispatch()

    const showUpdateForm = () => {
        dispatch(setCurrentModal(() => (<UpdateReservationForm reservation={reservation} />)));
        dispatch(showModal());
      }

  return <div type="button" onClick={showUpdateForm} className={styles.button}>cancel</div>;
};
