import React from 'react'
import styles from './SingleRestaurant.module.css';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const ReviewsDisplay = ({restaurant}) => {
  const reviews = restaurant.reviews

  return (
      <div>
        {/* {reviews.map((review) => (
            <img src={review.imgURL}>
            <div>
              {review.rating}
            </div>
            <div>
              {review.review}
            </div>

        ))} */}
        {reviews.map((review) => {
          <>
            <img src={review.imgURL} alt=''/>
            <div>
              {review.rating}
            </div>
            <div>
              {review.review}
            </div>
          </>
        })}
      </div>
  )
}
