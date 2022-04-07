import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { PageContainer } from '../PageContainer'
import styles from './SearchResults.module.css'

const SearchResults = () => {
    const { dateString, timeParams, searchWord } = useParams()
    const history = useHistory()

    const restaurants = useSelector(state => Object.values(state.restaurants))

    const timeManipulation = (time) => {
        const splitTime = timeParams.split(":")
        const hour = parseInt(splitTime[0], 10)

        if (hour < 12) {
            splitTime.push("AM")
        } else {
            if (hour > 12) splitTime[0] -= 12
            splitTime.push("PM")
        }

        return `${parseInt(splitTime[0], 10)}:${splitTime[1]} ${splitTime[2]}`
    }

    console.log(timeManipulation(timeParams))

    const restaurants_set = new Set()
    restaurants.forEach((restaurant, index) => {
        if (restaurant.name.toLowerCase().includes(searchWord.toLowerCase())) {
            restaurants_set.add(index)
        }
        if (restaurant.street_address.toLowerCase().includes(searchWord.toLowerCase())) {
            restaurants_set.add(index)
        }
        if (restaurant.phone_number === searchWord) {
            restaurants_set.add(index)
        }
    })

    const matched_restaurants = Array.from(restaurants_set)

    return (
        <PageContainer>
            <h1>Search Results</h1>
            <button className={styles.return_home} onClick={() => history.push("/")}>Return Home</button>
            <div className={styles.all_restaurants}>
                {matched_restaurants.length
                ?
                (<div className={styles.parent_container_each}>
                        <div className={styles.search_intro_message}>{`You searched for "${searchWord}" for ${new Date(dateString).toDateString()} at ${timeManipulation(timeParams)}`}:</div>
                        <div><strong>{`Your search result has returned ${matched_restaurants.length} restaurants: `}</strong></div>
                        <div className={styles.each_restaurant}>
                            {matched_restaurants.map(restaurant_index => (
                                <div className={styles.each_wrapper} key={restaurant_index}>
                                    <img src={restaurants[restaurant_index].img_url} alt="" width="200px"></img>
                                    <div className={styles.each_wrapper_info}>
                                        <div>{restaurants[restaurant_index].name}</div>
                                        <div><i className="fa-solid fa-map-location-dot"></i>
                                        <span>{restaurants[restaurant_index].street_address.split(",")[0]}, </span>
                                        <span>{restaurants[restaurant_index].borough}</span>
                                        </div>
                                        <div><i className="fa-solid fa-phone"></i>{`
                                        (${restaurants[restaurant_index].phone_number.slice(0, 3)}) ${restaurants[restaurant_index].phone_number.slice(3, 6)}-${restaurants[restaurant_index].phone_number.slice(6)}
                                        `}</div>
                                        <div><i className="fa-solid fa-earth-americas"></i>{restaurants[restaurant_index].website}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    )
                :
                (
                    <div className={styles.no_search_results}>
                        <div>No Search Results Were Found.</div>
                    </div>
                )
            }
            </div>
        </PageContainer>
    )
}

export default SearchResults
