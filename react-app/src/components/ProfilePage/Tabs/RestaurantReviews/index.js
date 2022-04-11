import React from 'react';
import { useSelector } from 'react-redux';
import { ReviewIcon } from '../../../Icons';
import styles from './RestaurantReviews.module.css';
import { starRender } from '../../../ReviewsDisplay/starRender';

export const RestaurantReviews = () => {
  const myRestaurants = useSelector(state => Object.values(state.session.user.restaurants))
  const allUsers = useSelector(state => state?.users)
  // console.log(allUsers[87])

  function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	const colors = ["#7D2C3B", "#983937", "#4E3C24", "#7E4675", "#24599D"];

  const brightColors = ["#D24E65", "#FC6260", "#F2BB78", "#D97ECB", "#4895FD"]


  return (
    <>
    <h1>What people are saying about your restaurants</h1>
    <div className={styles.restaurantContainer}>
      {myRestaurants?.map((restaurant) => (
        <>
        <div className={styles.restaurantName} style={{backgroundColor: `${brightColors[getRandomInt(5)]}`}}>{restaurant.name}</div>
        <div className={styles.container}>
              {Object.values(restaurant?.reviews).map(review => (
            <div className={styles.rw_parent}>
              <div className={styles.singleReview}>
                <>
                <div className={styles.r_left}>
                  <div className={styles.iconContainer}>
                    <div className={styles.icon} style={{backgroundColor: `${colors[getRandomInt(5)]}`,}}>
                      {allUsers[`${review.user_id}`].first_name[0]}
                      {allUsers[`${review.user_id}`].last_name[0]}
                    </div>
                  </div>

                  <div className={styles.nameAndCount}>
                      {review.user_first_name}
                    <div className={styles.reviewCount}>
                      {<ReviewIcon/>}
                      {Object.values(allUsers[`${review.user_id}`].reviews).length}
                    </div>
                  </div>


                  <div className={styles.image}>
                    <img src={review.img_url} alt="" className={styles.image}/>
                  </div>
                </div>

                <div className={styles.r_right}>
                  <div className={styles.stars}>
                    {starRender(review.stars)}
                  </div>


                  <div className={styles.content}>
                    {review.review}
                  </div>
                </div>
                </>
            </div>
          </div>
              ))}
        </div>
        </>
      ))}
    </div>
    </>
  )
}
