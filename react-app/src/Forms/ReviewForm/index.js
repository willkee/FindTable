import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import styles from "./ReviewForm.module.css"

export const ReviewForm = ({restaurant, reservation}) => {
    const [rating, setRating] = useState(null);
    const [content, setContent] = useState(null);
    const user = useSelector(state => state.session.user)

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>
                {user.firstName}, how was your experience at {restaurant.name}?
            </h1>
            <h3>
                Rate your dining experience (required)
            </h3>
            <h3>
                Reservation made on {reservation.date}
            </h3>
            <select value={rating} onChange={setRating(e.target.value)} required>
                <option value={1}>*</option>
                <option value={2}>**</option>
                <option value={3}>***</option>
                <option value={4}>****</option>
                <option value={5}>*****</option>
            </select>
            <label htmlFor="review"></label>
            <textarea className={styles.content} name="review" required>
            </textarea>
            <button type='submit' disabled={!rating || !content ? true : false}></button>
        </form>
    )
}
