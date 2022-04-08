import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
// import styled from 'styled-components';
import styles from "./ReviewForm.module.css"
import { createReview } from '../../store/reviews';


export const ReviewForm = () => {
    const [rating, setRating] = useState(null);
    const [content, setContent] = useState(null);
    const [imgURL, setImgURL] = useState(null);
    const user = useSelector(state => state.session.user)
    const {restaurantId} = useParams()
    const dispatch = useDispatch()
    const restaurant = useSelector(state => Object.values(state.restaurants)[restaurantId])
    console.log(restaurant)
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
          user_id: user.id,
          restaurant_id: restaurant.id,
          stars: rating,
          img_url: imgURL,
          review: content
        }
        dispatch(createReview(formData))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>
                Hi {user.first_name}, how was your experience at {restaurant.name}?
            </h1>
            <h3>
                Rate your dining experience!
            </h3>
            <select value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required>
                <option value={1}>*</option>
                <option value={2}>**</option>
                <option value={3}>***</option>
                <option value={4}>****</option>
                <option value={5}>*****</option>
            </select>
            <input type="url"
                    placeholder="Image URL"
                    onChange={e => setImgURL(e.target.value)}
                    value={imgURL}>
            </input>
            <label htmlFor="review"></label>
            <textarea className={styles.content}
                      name="review"
                      onChange={e => setContent(e.target.value)}
                      required>
            </textarea>
            <button type='submit' disabled={!rating || !content ? true : false}>Submit</button>
        </form>
    )
}
