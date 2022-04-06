import styles from './Homepage.module.css'
import {PageContainer} from '../PageContainer'

import SearchHeader from '../SearchHeader'

import { useEffect, useState } from 'react'



export const Homepage = () => {
  // const [location, setLocation] = useState('Brooklyn')
  const [userLocation, setUserLocation] = useState('')

  //For future referece, you can get a user's location like this.
  const getLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = (pos) => {
      const crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const geo = navigator.geolocation.getCurrentPosition(success, error, options);
    setUserLocation(geo)
  }

  useEffect(() => {
    getLocation()
    console.log(userLocation)
  },[userLocation])

  return (
    <PageContainer>

      <SearchHeader className={styles.search_header_component} />

{/* //       <div>
//         {location}
//       </div> */}
      {/* //import restaurant cards */}

    </PageContainer>
  )
}
