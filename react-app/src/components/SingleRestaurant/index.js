import React from 'react'
import styles from './SingleRestaurant.module.css';
import { PageWrapper } from '../PageWrapper';
import { PageContainer } from '../PageContainer';
import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import pattern from './pattern.png'
import ReviewCounter from '../ReviewCounter';
// import { createReview } from '../../store/reviews';
// import { ReviewForm } from '../../Forms/ReviewForm';


export const SingleRestaurant = () => {
  const {id} = useParams()
  const restaurant = useSelector(state => Object.values(state.restaurants))[id - 1]

  const stars = Object.values(restaurant.reviews).map(review => review.stars)


  // const handleNewReview = () => {
    //   dispatch(createReview({

      //   }))
      // }


  const API_KEY = process.env.REACT_APP_GMAPS_KEY;
  const API_URL = `https://maps.googleapis.com/maps/api/staticmap?center=${restaurant.street_address}&zoom=16&size=300x500&maptype=roadmap&markers=color:red%7Clabel:.%7C${restaurant.street_address}&key=${API_KEY}`

  const getAverageRating = (data) => {
    let totalStars = 0;
    Object.values(data.reviews).forEach(review => totalStars += review.stars)
    return (totalStars / Object.values(data.reviews).length).toFixed(1)
  }

  const showPriceRating = (num) => {
    if (num === 1) {
      return `$10 and under (per person)`
    } else if (num === 2) {
      return `$11 - $30 (per person)`
    } else if (num === 3) {
      return `$31 - $50 (per person)`
    } else {
      return `More than $50 (per person)`
    }
  }

  return (
        <PageWrapper>
            <PageContainer className={styles.sr_custom_pc}>
              <img src={pattern} className={styles.sr_banner} alt="banner pattern"></img>
              <img className={styles.sr_img} src={restaurant.img_url} alt="" width="200px"></img>
              <div className={styles.left_sidebar}></div>

              <div className={styles.sr_parent}>
                <div className={styles.sr_content}>
                    {/* Restaurant Name */}
                    <h2>{restaurant.name}</h2>

                    <div className={styles.content_sub_header1}>
                      {/* Restaurant Price Rating */}
                      <span><i className="fa-solid fa-money-check-dollar"></i> {showPriceRating(restaurant.price_rating)}</span>

                      {/* Restaurant Cuisine */}
                      <span><i className="fa-solid fa-utensils"></i> {restaurant.cuisines.map(cuisine => (<span key={cuisine.id}>{cuisine.type}</span>))}</span>

                      {/* Restaurant Setting */}
                      <span><i className="fa-solid fa-building"></i> {restaurant.settings.map(setting => (<span key={setting.id}>{setting.type}</span>))}</span>
                    </div>

                    <div className={styles.content_sub_header2}>
                      {/* Restaurant Star Rating */}
                      <span><i className="fa-solid fa-star"></i> {getAverageRating(restaurant)} Stars</span>

                      {/* Restaurant Review Count */}
                      <span><i className="fa-solid fa-message"/> {` ${Object.values(restaurant.reviews).length} Reviews`}</span>
                    </div>

                    {/* Restaurant Cuisine */}
                    <div>{restaurant.description}</div>

                    <h3>What {Object.values(restaurant.reviews).length} people are saying</h3>
                    <hr></hr>
                    <ReviewCounter stars={stars}/>
                </div>
              </div>



              <div className={styles.right_sidebar}>
                  <div className={styles.gmaps_static}><img src={API_URL} alt="Google Maps"></img></div>
                  <div className={styles.address_text}>
                    <div>{restaurant.street_address.split(",")[0].split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")}</div>
                    <div>{`${restaurant.borough}, NY ${restaurant.street_address.split(",")[1]}`}</div>
                  </div>
                  <div><a href={restaurant.website} target="_blank" rel="noreferrer"><i className="fa-solid fa-earth-americas"></i> Website</a></div>
                  <div><a href={`https://www.google.com/maps/place/${restaurant.street_address}`} target="_blank" rel="noreferrer"><i className="fa-solid fa-diamond-turn-right"/>Get Directions</a>
</div>
              </div>
            </PageContainer>
        </PageWrapper>
    )
}
