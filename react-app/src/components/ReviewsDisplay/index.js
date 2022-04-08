import React from 'react'
import styles from './ReviewsDisplay.module.css';
import { useSelector } from 'react-redux';


export const ReviewsDisplay = ({restaurant}) => {
  const allUsers = useSelector(state => state.users)
  const reviews = Object.values(restaurant?.reviews)

  return (
    <>
      <div className={styles.container}>
        {reviews.map((review) => (
          <div className={styles.singleReview}>
            <div className={styles.icon}>
              {allUsers[`${review.user_id}`].first_name[0]}{allUsers[`${review.user_id}`].last_name[0]}
            </div>
            <div className={styles.nameAndCount}>
              {review.user_first_name}<br />
              {Object.values(allUsers[`${review.user_id}`].reviews).length} reviews
            </div>
            <img src={review.img_url} alt='' className={styles.image}/>
            <div className={styles.rating}>
              {review.rating}
            </div>
            <div className={styles.content}>
              {review.review}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
