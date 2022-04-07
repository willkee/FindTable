import styles from './SinglRestaurant.module.css';
import PageWrapper from '../PageWrapper';
import Navbar from '../Navbar';
import PageContainer from '../PageContainer';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/reviews';

export const SingleRestaurant = () => {
  const id = useParams()
  const dispatch = useDispatch()
  const restaurant = useSelector(state => Object.values(state.restaurants)[id])

  const handleNewReview = () => {
    dispatch(createReview({

    }))
  }

  return (
        <PageWrapper>
            <Navbar />
            <PageContainer>
              <div>{restaurant}</div>
            </PageContainer>
        </PageWrapper>
    )
}
