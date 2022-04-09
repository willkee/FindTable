import { useHistory } from 'react-router-dom'
import {PageContainer} from '../PageContainer'
import styles from './Homepage.module.css'
import SearchHeader from '../SearchHeader'
import RestaurantsList from '../RestaurantsList'

export const Homepage = ({ all_restaurants }) => {
  const history = useHistory();
  const handleClick = () => history.push('/new-restaurant')

  return (
    <PageContainer>
      <SearchHeader className={styles.search_header_component} />
      <RestaurantsList all_restaurants={all_restaurants} />
      <div className={styles.lower_banner}>
        <h1 className={styles.lower_banner_text}>Restauranteurs Join Us</h1>
        <h2 className={styles.lower_banner_text}> Join a rich community of restaurants which fill seats and</h2>
        <h2 className={styles.lower_banner_text}> build their reputation with FindTable.</h2>
        <div onClick={handleClick} role='button' className={styles.lower_banner_button}>Create Your Restaurant</div>
      </div>
    </PageContainer>
  )
}
