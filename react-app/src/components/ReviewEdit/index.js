import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal, setCurrentModal } from '../../store/modal';
import {ReviewForm} from '../../Forms/ReviewForm';
import styles from './ReviewEdit.module.css';

export const ReviewEdit = ({review}) => {
  const dispatch = useDispatch();

  const showReviewEditForm = () => {
    dispatch(setCurrentModal(() => (<ReviewForm review={review}/>)))
    dispatch(showModal());
  }

  return <div onClick={showReviewEditForm} className={styles.edit}>Edit</div>
}
