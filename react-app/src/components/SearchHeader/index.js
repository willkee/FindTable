import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './SearchHeader.module.css'
import Calendar from 'react-calendar'
// import Datetime from 'react-datetime'
import { CalendarIcon } from '../Icons'

const SearchHeader = () => {
    const [date, setDate] = useState(new Date())
    const [searchQuery, setSearchQuery] = useState("")
    const [showCalendar, setShowCalendar] = useState(false)
    const [time, setTime] = useState("08:00")

    const openCalendar = () => setShowCalendar(!showCalendar)
    const history = useHistory()

    useEffect(() => {
        if (!showCalendar) return;

        const closeCalendar = () => setShowCalendar(false);
        document.addEventListener("click", closeCalendar)

        console.log('flag', document.getElementsByClassName("react-calendar__month-view__days")[0])

        return () => document.removeEventListener("click", closeCalendar)
    })

    const handleSubmit = e => {
        e.preventDefault()

        if (searchQuery.includes("%")) {
            alert(`Please do not use the "percent" symbol in your search query.`)
            setSearchQuery("")
            return
        }

        // console.log(date.toDateString())
        // console.log(time)

        if (searchQuery) {
            history.push({
                pathname: `/search/${date.toDateString()}/${time}/${searchQuery}`,
                })
            return
        } else {
            alert(`Please enter a search query.`)
            return
        }

    }


    return (
        <div className={styles.search_header}>
            <h1>Find your table for any occasion</h1>
                <form >
                    <div className={styles.search_inputs}>
                        <div className={styles.search_inner_div}>
                            <input className={styles.search_box_field} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search'></input>
                        </div>
                    </div>
                    <div role='button' onClick={handleSubmit} className={styles.search_button}>Let's Go</div>
                </form>
        </div>
    )
}

export default SearchHeader
