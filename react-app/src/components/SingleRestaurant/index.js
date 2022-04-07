import styles from './SingleRestaurant.module.css';
import { PageWrapper } from '../PageWrapper';
import { PageContainer } from '../PageContainer';
import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import pattern from './pattern.png'
// import { createReview } from '../../store/reviews';

export const SingleRestaurant = () => {
  const {id} = useParams()
  // const dispatch = useDispatch()
  const restaurant = useSelector(state => Object.values(state.restaurants))[id - 1]
  // const handleNewReview = () => {
  //   dispatch(createReview({

  //   }))
  // }

  return (
        <PageWrapper>
            <PageContainer className={styles.sr_custom_pc}>
              <img src={pattern} className={styles.sr_banner} alt="banner pattern"></img>
              <img className={styles.sr_img} src={restaurant.img_url} alt="" width="200px"></img>
              <div className={styles.left_sidebar}></div>
              <div className={styles.sr_parent}>

                <div className={styles.sr_content}>
                  <h2>{restaurant.name}</h2>
                  <div>{restaurant.street_address}</div>
                  <div>{restaurant.borough}</div>
                  <div>{restaurant.website}</div>
                </div>
              </div>
              <div className={styles.right_sidebar}></div>
            </PageContainer>
        </PageWrapper>
    )
}
