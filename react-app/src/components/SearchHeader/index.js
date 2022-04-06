import React, { useState, useEffect } from 'react'
import styles from './SearchHeader.module.css'
import Calendar from 'react-calendar'
// import Datetime from 'react-datetime'
import { Calendar as CalendarIcon } from '../Icons'

const SearchHeader = () => {
    const [date, setDate] = useState(new Date())
    const [searchQuery, setSearchQuery] = useState("")
    const [showCalendar, setShowCalendar] = useState(false)
    const [time, setTime] = useState("08:00")

    const openCalendar = () => setShowCalendar(!showCalendar)

    useEffect(() => {
        if (!showCalendar) return;

        const closeCalendar = () => setShowCalendar(false);
        document.addEventListener("click", closeCalendar)

        return () => document.removeEventListener("click", closeCalendar)
    })



    return (
        <div className={styles.search_header}>
            <h1>Find your table for any occasion</h1>
            <div className={styles.search_inputs}>
                <div className={styles.calendar_box} onClick={openCalendar}><span><CalendarIcon/></span>{new Date(date).toDateString().slice(4)}</div>
                <div className={styles.search_inner_div}>
                    {showCalendar &&
                        <div className={styles.search_calendar} onClick={e => e.stopPropagation()}>
                            <Calendar minDate={new Date()} onChange={(e) => setDate(e)} value={date}/>
                        </div>
                    }
                    {/* <div className={styles.time_object}>
                        <Datetime dateFormat={false} timeConstraints={{hours: {min: 8, max: 22, step: 1}, minutes: {step: 30}}}/>

                    </div> */}
                    <div className={styles.time_selector}>
                        <select className={styles.time_selector_element} value={time} onChange={e => setTime(e.target.value)}>
                            <option disabled>-- Breakfast --</option>
                            <option value={"08:00"} selected>8:00 AM</option>
                            <option value={"08:30"}>8:30 AM</option>
                            <option value={"09:00"}>9:00 AM</option>
                            <option value={"09:30"}>9:30 AM</option>
                            <option value={"10:00"}>10:00 AM</option>
                            <option value={"10:30"}>10:30 AM</option>
                            <option disabled>-- Lunch --</option>
                            <option value={"11:00"} >11:00 AM</option>
                            <option value={"11:30"} >11:30 AM</option>
                            <option value={"12:00"} >12:00 PM</option>
                            <option value={"12:30"} >12:30 PM</option>
                            <option value={"13:00"}>1:00 PM</option>
                            <option value={"13:30"}>1:30 PM</option>
                            <option value={"14:00"}>2:00 PM</option>
                            <option disabled>-- Afternoon --</option>
                            <option value={"14:30"}>2:30 PM</option>
                            <option value={"15:00"}>3:00 PM</option>
                            <option value={"15:30"}>3:30 PM</option>
                            <option value={"16:00"}>4:00 PM</option>
                            <option value={"16:30"}>4:30 PM</option>
                            <option disabled>-- Dinner --</option>
                            <option value={"17:00"}>5:00 PM</option>
                            <option value={"17:30"}>5:30 PM</option>
                            <option value={"18:00"}>6:00 PM</option>
                            <option value={"18:30"}>6:30 PM</option>
                            <option value={"19:00"}>7:00 PM</option>
                            <option value={"19:30"}>7:30 PM</option>
                            <option value={"20:00"}>8:00 PM</option>
                            <option value={"20:30"}>8:30 PM</option>
                            <option value={"21:00"}>9:00 PM</option>
                            <option value={"21:30"}>9:30 PM</option>
                            <option value={"22:00"}>10:00 PM</option>
                        </select>
                    </div>

                    <input className={styles.search_box_field} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search'></input>
                </div>
            </div>
        </div>
    )
}

export default SearchHeader
