import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import pattern from './pattern.png'
import styles from './SingleRestaurant.module.css';

import { PageWrapper } from '../PageWrapper';
import { PageContainer } from '../PageContainer';

import ReviewCounter from '../ReviewCounter';
import { ReviewsDisplay } from '../ReviewsDisplay';
import { ReservationForm } from '../../Forms/ReservationForm'
import { UpdateRestaurant } from '../UpdateRestaurant'
import { DeleteRestaurant } from '../DeleteRestaurant'
import { receiveOneRestaurant } from '../../store/restaurants';

// import { showModal, setCurrentModal } from '../../store/modal';
// import { ReviewForm } from '../../Forms/ReviewForm';
// import { createReview } from '../../store/reviews';
// import { ReviewForm } from '../../Forms/ReviewForm';


export const SingleRestaurant = () => {
  const { id } = useParams()
  const [myKey, setMyKey] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  // find restaurant owner id and session user id
  // const restaurant = useSelector(state => (state.restaurants))

  const dispatch = useDispatch()

  const restaurantState = useSelector(state => state.restaurants)
  const restaurant = restaurantState[`${id}`]

  const sessionUser = useSelector((state) => state?.session?.user);

  // set isOwner to true if the current user owns the restaurant being viewed
  // this will display the update/delete restaurant buttons
  let isOwner = false
  sessionUser && restaurant?.owner_id === sessionUser.id ? isOwner = true : isOwner = false

  const stars = Object?.values(restaurant?.reviews).map(review => review?.stars)


  // const handleNewReview = () => {
    //   dispatch(createReview({

      //   }))
      // }

      useEffect(() => {
        (async () => {
          const res = await fetch(`/api/auth/get_key`);
          const key = await res.json();
          setMyKey(key)

          await dispatch(receiveOneRestaurant(id))
          setIsLoaded(true)
        })();
      }, [dispatch, id])

  const API_URL = `https://maps.googleapis.com/maps/api/staticmap?center=${restaurant.street_address}&zoom=16&size=300x500&maptype=roadmap&markers=color:red%7Clabel:.%7C${restaurant.street_address}&key=${myKey.key}`

  const getAverageRating = (data) => {

    if (Object.values(restaurant.reviews).length === 0) {
      return "No"
    }
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
        <PageWrapper>{isLoaded &&
            <PageContainer className={styles.sr_custom_pc}>
              <img src={pattern} className={styles.sr_banner} alt="banner pattern"></img>
              <img className={styles.sr_img} src={restaurant.img_url} alt="" width="200px"></img>
              <div className={styles.left_sidebar}>
                <ReservationForm />
              </div>

              <div className={styles.sr_parent}>
                <div className={styles.sr_content}>
                    {/* Restaurant Name */}
                    <h2>{restaurant.name}</h2>

                    <div className={styles.content_sub_header1}>
                      {/* Restaurant Price Rating */}
                      <span><i className="fa-solid fa-money-check-dollar"></i> {showPriceRating(restaurant.price_rating)}</span>

                      {/* Restaurant Cuisine */}
                      <span><i className="fa-solid fa-utensils"></i> {restaurant.cuisines.map(cuisine => (<span key={cuisine.id}>{cuisine.type}   </span>))}</span>

                      {/* Restaurant Setting */}
                      <span><i className="fa-solid fa-building"></i> {restaurant.settings.map(setting => (<span key={setting.id}>{setting.type}  </span>))}</span>
                    </div>

                    <div className={styles.content_sub_header2}>
                      {/* Restaurant Star Rating */}
                      <span><i className="fa-solid fa-star"></i> {getAverageRating(restaurant)} Stars</span>

                      {/* Restaurant Review Count */}
                      <span><i className="fa-solid fa-message"/> {` ${Object.values(restaurant.reviews).length} Reviews`}</span>
                    </div>
                    {isOwner &&
                    <div className={styles.button_container}>
                      <UpdateRestaurant restaurant={restaurant}/>
                      <DeleteRestaurant restaurant_id={restaurant.id}/>
                    </div>}
                    {/* Restaurant Cuisine */}
                    <div>{restaurant.description}</div>
                    {Object.values(restaurant.reviews).length > 0 ?
                        Object.values(restaurant.reviews).length === 1 ?
                          <div>
                            <h3>What {Object.values(restaurant.reviews).length} person is saying</h3>
                            <hr></hr>
                            <ReviewCounter stars={stars}/>
                            <hr></hr>
                          </div>
                          :
                          <div>
                            <h3>What {Object.values(restaurant.reviews).length} people are saying</h3>
                            <hr></hr>
                            <ReviewCounter stars={stars}/>
                            <hr></hr>
                          </div>
                    :
                    <div>
                        <h3>There are no reviews.</h3>
                        <hr></hr>
                    </div>
                    }
                    <ReviewsDisplay restaurant={restaurant}/>
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
            </PageContainer>}
        </PageWrapper>
    )
}
