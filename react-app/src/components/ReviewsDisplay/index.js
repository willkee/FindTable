import React from 'react'
import styles from './SingleRestaurant.module.css';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const ReviewsDisplay = ({restaurant}) => {
  const reviews = restaurant.reviews

  return (
      <div>
        {reviews.map((review) => (
          <>
            <div>
              {review.user.first_name}
            </div>
            <div>
              {}
            </div>
            <img src={review.imgURL}/>
            <div>
              {review.rating}
            </div>
              <div>
              {review.review}
              </div>
          </>
        ))}
      </div>
  )
}
