// import styles from './SingleRestaurant.module.css';
import { PageWrapper } from '../PageWrapper';
import Navbar from '../Navbar';
import { PageContainer } from '../PageContainer';
import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
            <Navbar />
            <PageContainer>
              <div>{restaurant.name}</div>
            </PageContainer>
        </PageWrapper>
    )
}
