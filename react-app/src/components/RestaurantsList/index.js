import React from "react";
// import { useSelector } from "react-redux";

const RestaurantsList = ({ all_restaurants }) => {
    // const all_restaurants = useSelector(state => Object.values(state.restaurants))

    const joinSettings = (restaurant => {
        let joined = '|'
        restaurant.settings.map(setting => joined = `${joined} ${setting.type} |`)
        console.log(joined)
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
                    </tr>
                </thead>
                <tbody>
                    {all_restaurants.map(restaurant => (
                        <tr>
                            <td>{restaurant.id}</td>
                            <td>{restaurant.owner_id}</td>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.price_rating}</td>
                            <td>{restaurant.description}</td>
                            <td><img src={restaurant.img_url} width="200px"></img></td>
                            <td>{restaurant.phone_number}</td>
                            <td>{restaurant.website}</td>
                            <td>{restaurant.street_address}</td>
                            <td>{restaurant.borough}</td>
                            <td>{restaurant.accessible ? "Yes" : "No"}</td>
                            <td>{joinSettings(restaurant)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantsList
