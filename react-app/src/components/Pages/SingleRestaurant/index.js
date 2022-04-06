import styles from './SinglRestaurant.module.css';
import PageContainer from '../PageContainer';
import styled from 'styled-components';

export const SingleRestaurant = ({restaurant}) => {
    console.log(restaurant)
    const name = restaurant.name
    const phoneNumber = restaurant.phoneNumber
    const imageURL = restaurant.imageURL

    return (
        <PageContainer id={styles.container}>
            <div>

            </div>
            <img />


        </PageContainer>
    )
}
