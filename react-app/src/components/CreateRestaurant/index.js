import React from 'react';
import { RestaurantForm } from '../../Forms/RestaurantForm';
import { PageContainer } from '../PageContainer';
import styles from './CreateRestaurant.module.css'

export const CreateRestaurant = () => {

  return (
    <PageContainer>
      <h1 className={styles.header}>Create Your New Restaurant</h1>
      <RestaurantForm />
    </PageContainer>
  )
};
