import styles from './Homepage.module.css'
import {PageContainer} from '../PageContainer'
import SearchHeader from '../SearchHeader'
import RestaurantsList from '../RestaurantsList'
import { useHistory } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { getLocation } from '../../store/session'

// import { useEffect, useState } from 'react'


export const Homepage = ({ all_restaurants }) => {
  const history = useHistory();
  // const [location, setLocation] = useState('Brooklyn')
  // const [userLocation, setUserLocation] = useState([])
  // const dispatch = useDispatch()

  // //For future referece, you can get a user's location like this.
  // const findLocation = () => {
  //   const options = {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0
  //   };

  //   const success = (pos) => {
  //     const crd = pos.coords;

  //     console.log('Your current position is:');
  //     console.log(`Latitude : ${crd.latitude}`);
  //     console.log(`Longitude: ${crd.longitude}`);
  //     console.log(`More or less ${crd.accuracy} meters.`);
  //     setUserLocation([crd.latitude, crd.longitude])
  //   }

  //   function error(err) {
  //     console.warn(`ERROR(${err.code}): ${err.message}`);
  //     setUserLocation([555, 444])
  //   }

  //   const geo = navigator.geolocation.getCurrentPosition(success, error, options);
  //   console.log("GEO!!!", geo)
  //   // setUserLocation(geo)
  // }

  // useEffect(() => {
  //   const locState = async () => {
  //     await findLocation()
  //     await dispatch(getLocation(userLocation))
  //   }

  //   locState()
  // },[dispatch])
  const handleClick = () => {
      history.push('/new-restaurant')
  }



  return (
    <PageContainer>

      <SearchHeader className={styles.search_header_component} />
      <RestaurantsList all_restaurants={all_restaurants} />
      <div className={styles.lower_banner}>
        <h1 className={styles.lower_banner_text}>Restauranteurs Join Us</h1>
        <h2 className={styles.lower_banner_text}> Join a rich community of restaurants which fill seats and</h2>
        <h2 className={styles.lower_banner_text}> build their reputation with FindTable.</h2>
        <div onClick={handleClick} role='button' className={styles.lower_banner_button}>
          Create Your Restaurant
        </div>
      </div>

    </PageContainer>
  )
}
