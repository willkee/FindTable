import React from "react";
import { deleteRestaurant } from "../../store/restaurants";
import {useHistory, Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import styles from './RestaurantsList.module.css'

const RestaurantsList = ({ all_restaurants }) => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();


    function onDelete(restaurantId) {
      let result = window.confirm('Are you sure you want to delete your restaurant listing?')
      if (result) {
        let res = dispatch(deleteRestaurant(restaurantId))
        if (res) {
          history.push(`/restaurants/`)
        }
      }
    }

    const joinSettings = (restaurant => {
        let joined = '|'
        restaurant.settings.map(setting => joined = ` ${joined} ${setting.type} `)
        return joined
    })
    const joinCuisines = (restaurant => {
        let joined = '|'
        restaurant.cuisines.map(cuisine => joined = ` ${joined} ${cuisine.type} `)
        return joined
    })

    const goToRestaurant = (id) => {
      history.push(`/restaurants/${id}`)
      return
    }

    return (
        <div className={styles.container}>
                <div className={styles.all_container}>
                    {all_restaurants.map(restaurant => (
                      <div onClick={() => goToRestaurant(restaurant.id)} className={styles.each_container} key={restaurant.id}>
                            <div className={styles.card_img}><img src={restaurant.img_url} alt=""/></div>
                            <div className={styles.info}>
                                <h3>{restaurant.name.length > 20 ? restaurant.name.slice(0, 20) + "..." : restaurant.name}</h3>
                                <div className={styles.borough_price}>
                                  <span><i className="fa-solid fa-city"></i>{restaurant.borough}</span>
                                  <span>{`${restaurant.price_rating === 4 ? "$$$$" :
                                            restaurant.price_rating === 3 ? "$$$" :
                                                restaurant.price_rating === 2 ? "$$" : "$"}`}</span></div>




                                <div className={styles.categories}>
                                  <span>{restaurant.accessible ? <i className="fa-brands fa-accessible-icon"></i> : ""}</span>
                                  <span>{joinSettings(restaurant)}</span>
                                  <span>{joinCuisines(restaurant)}</span></div>
                                {/* <div>{sessionUser && sessionUser.id === restaurant?.owner_id ?
                                    <Link to={`/restaurants/`} className='delete' onClick={() => onDelete(restaurant.id)}>
                                      Delete</Link> : null}</div> */}
                            </div>
                      </div>
                    ))}
                </div>
        </div>
    )
}

export default RestaurantsList
