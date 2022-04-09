import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './SearchHeader.module.css'

const SearchHeader = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()

        if (searchQuery.includes("%")) {
            alert(`Please do not use the "percent" symbol in your search query.`)
            setSearchQuery("")
        } else if (searchQuery) {
            history.push(`/search/${searchQuery}`)
        } else {
            alert(`Please enter a search query.`)
        }
        return
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
