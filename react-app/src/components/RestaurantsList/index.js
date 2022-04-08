import React from "react";
import { deleteRestaurant } from "../../store/restaurants";
import {useHistory, Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

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
        restaurant.settings.map(setting => joined = `${joined} ${setting.type} |`)
        return joined
    })
    const joinCuisines = (restaurant => {
        let joined = '|'
        restaurant.cuisines.map(cuisine => joined = `${joined} ${cuisine.type} |`)
        return joined
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Restaurant ID</th>
                        <th>Owner ID</th>
                        <th>Name</th>
                        <th>Price Rating</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Phone Number</th>
                        <th>Website</th>
                        <th>Street Address</th>
                        <th>Borough</th>
                        <th>Accessible</th>
                        <th>Settings</th>
                        <th>Cuisines</th>
                    </tr>
                </thead>
                <tbody>
                    {all_restaurants.map(restaurant => (
                      <tr key={restaurant.id}>
                            <td>{restaurant.id}</td>
                            <td>{restaurant.owner_id}</td>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.price_rating}</td>
                            <td>{restaurant.description}</td>
                            <td><img src={restaurant.img_url} alt="" width="200px"></img></td>
                            <td>{restaurant.phone_number}</td>
                            <td>{restaurant.website}</td>
                            <td>{restaurant.street_address}</td>
                            <td>{restaurant.borough}</td>
                            <td>{restaurant.accessible ? "Yes" : "No"}</td>
                            <td>{joinSettings(restaurant)}</td>
                            <td>{joinCuisines(restaurant)}</td>
                            <td>
                              {sessionUser && sessionUser.id === restaurant?.owner_id ?
                                <Link to={`/restaurants/`} className='delete' onClick={() => onDelete(restaurant.id)}>
                                  Delete
                                </Link> : null
                              }
                            </td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantsList
