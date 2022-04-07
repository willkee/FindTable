import React from 'react'
import styles from './SingleRestaurant.module.css';
import { PageWrapper } from '../PageWrapper';
import { PageContainer } from '../PageContainer';
import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import pattern from './pattern.png'
// import { createReview } from '../../store/reviews';
import { ReviewForm } from '../../Forms/ReviewForm';


export const SingleRestaurant = () => {
  const {id} = useParams()
  const restaurant = useSelector(state => Object.values(state.restaurants))[id - 1]
  // console.log(restaurant)
  // const handleNewReview = () => {
    //   dispatch(createReview({

      //   }))
      // }


  const API_KEY = process.env.REACT_APP_GMAPS_KEY;
  const API_URL = `https://maps.googleapis.com/maps/api/staticmap?center=${restaurant.street_address}&zoom=16&size=600x300&maptype=roadmap&markers=color:red%7Clabel:.%7C${restaurant.street_address}&key=${API_KEY}`

  const getAverageRating = (data) => {
    let totalStars = 0;
    data.reviews.forEach(review => totalStars += review.stars)
    return (totalStars / data.reviews.length).toFixed(1)
  }
  console.log(getAverageRating(restaurant))

  return (
        <PageWrapper>
            <PageContainer className={styles.sr_custom_pc}>
              <img src={pattern} className={styles.sr_banner} alt="banner pattern"></img>
              <img className={styles.sr_img} src={restaurant.img_url} alt="" width="200px"></img>
              <div className={styles.left_sidebar}></div>

              <div className={styles.sr_parent}>

                <div className={styles.sr_content}>
                    <h2>{restaurant.name}</h2>
                    <div>
                      <span><i className="fa-solid fa-message"/></span>
                      <span>{getAverageRating(restaurant)}  </span>
                      <span>{`${restaurant.reviews.length} Reviews`}</span>
                      <span> {restaurant.cuisines.map(cuisine => (<span key={cuisine.id}>{cuisine.type}</span>))}</span>
                      <span> {restaurant.settings.map(setting => (<span key={setting.id}>{setting.type}</span>))}</span>
                    </div>
                    <div>{console.log(restaurant)}</div>

                    <div>{restaurant.description}</div>
                </div>
              </div>



              <div className={styles.right_sidebar}>
                  <div className={styles.gmaps_static}><img src={API_URL} alt="Google Maps"></img></div>
                  <div>{restaurant.street_address}</div>
                  <div>{restaurant.borough}</div>
                  <a href={restaurant.website} target="_blank" rel="noreferrer"><i className="fa-solid fa-earth-americas"></i> Website</a>
                  <a href={`https://www.google.com/maps/place/${restaurant.street_address}`} target="_blank" rel="noreferrer">Get Directions</a>
              </div>
            </PageContainer>
        </PageWrapper>
    )
}
