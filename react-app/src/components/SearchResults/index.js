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
            <div className={styles.search_intro_message}>{`You searched for "${searchWord}" for ${new Date(dateString).toDateString()} at ${timeManipulation(timeParams)}`}:</div>
            <div className={styles.all_restaurants}>
                {matched_restaurants.length
                ?
                    (<div className={styles.parent_container_each}>
                        <button onClick={() => history.push("/")}>Return Home</button>
                        <div className={styles.each_restaurant}>
                            {matched_restaurants.map(restaurant_index => (
                                <div key={restaurant_index}>

                                <div>{restaurants[restaurant_index].name}</div>
                                <div>{restaurants[restaurant_index].street_address}</div>
                                <div>{restaurants[restaurant_index].phone_number}</div>
                                <img src={restaurants[restaurant_index].img_url} width="200px"></img>
                                </div>
                            ))}
                        </div>
                    </div>
                    )
                :
                (
                    <div className={styles.no_search_results}>
                        <div>No Search Results Were Found.</div>
                        <button onClick={() => history.push("/")}>Return Home</button>
                    </div>
                )
            }
            </div>
        </PageContainer>
    )
}

export default SearchResults
