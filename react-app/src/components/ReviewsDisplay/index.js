import React from 'react'
import styles from './ReviewsDisplay.module.css';
import { useSelector } from 'react-redux';
import { ReviewIcon } from '../Icons';
import {ReviewEdit} from '../ReviewEdit';


export const ReviewsDisplay = ({restaurant}) => {
  const allUsers = useSelector(state => state?.users)
  const reviews = Object.values(restaurant?.reviews)
  const sessionUser = useSelector(state => state.session.user)
  console.log(sessionUser)


  const starRender = (stars) => {
    if (stars === 1) {
      return (
        <>
        <i className="fa-solid fa-star"></i>
        </>
      )
    }
    if (stars === 2) {
      return (
        <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        </>
      )
    }
    if (stars === 3) {
      return (
        <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        </>
      )
    }
    if (stars === 4) {
      return (
        <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        </>
      )
    }
    if (stars === 5) {
      return (
        <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        </>
      )
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const deleteReview = () => {

  }

  const colors = [
    "#7D2C3B",
    "#983937",
    "#4E3C24",
    "#7E4675",
    "#24599D"
  ]

  return (
      <div className={styles.container}>
        {reviews.map((review) => (
          <div className={styles.singleReview}>
            <div className={styles.iconContainer}>
              <div className={styles.icon} style={{backgroundColor:`${colors[getRandomInt(5)]}`}}>
                {allUsers[`${review.user_id}`].first_name[0]}{allUsers[`${review.user_id}`].last_name[0]}
              </div>
            </div>
            <div className={styles.nameAndCount}>
              {review.user_first_name}<br />
              <div className={styles.reviewCount}>
              {<ReviewIcon/>}
              {Object.values(allUsers[`${review.user_id}`].reviews).length} reviews
              </div>
            </div>
            <div className={styles.image}>
              <img src={review.img_url} alt='' className={styles.image}/>
            </div>
            <div className={styles.stars}>
              {starRender(review.stars)}
            </div>
            <div className={styles.content}>
              {review.review}
            </div>
            <div className={styles.editDelete}>
              {sessionUser && review.user_id === sessionUser.id ?
                <ReviewEdit review={review}/> : null
              }
              {sessionUser && review.user_id === sessionUser.id ?
                <div className={styles.delete} onClick={deleteReview}>Delete</div> : null
              }
            </div>
          </div>))}
      </div>
)}
