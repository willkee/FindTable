import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from "./ReviewForm.module.css"
import { createReview } from '../../store/reviews';


export const ReviewForm = ({restaurant}) => {
    const [rating, setRating] = useState(null);
    const [content, setContent] = useState(null);
    const [imgURL, setImgURL] = useState(null);
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

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
      <div className={styles.reviewContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.reviewHeader}>
            <h3>
                Hi {user?.first_name}, how was your experience at {restaurant.name}?
            </h3>
            <h5>
                Rate your dining experience!
            </h5>
          </div>
            <select value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required>
                <option value={1}>*</option>
                <option value={2}>**</option>
                <option value={3}>***</option>
                <option value={4}>****</option>
                <option value={5}>*****</option>
            </select>
            {/* <div className={styles.starsContainer}>

              <input type="radio" id="star1" value={1} onChange={e =>{console.log(rating)
                setRating(e.target.value)}}/>
              <label for="star1">star 1</label>

              <input type="radio" id="star2" value={2} onChange={e => {console.log(rating)
                setRating(e.target.value)}}/>
              <label for="star2">star 2</label>

              <input type="radio" id="star3" value={3} onChange={e => {console.log(rating)
                setRating(e.target.value)}}/>
              <label for="star3">star 3</label>

              <input type="radio" id="star4" value={4} onChange={e => {console.log(rating)
                setRating(e.target.value)}}/>
              <label for="star4">star 4</label>

              <input type="radio" id="star5" value={5} onChange={e => {console.log(rating)
                setRating(e.target.value)}}/>
              <label for="star5">star 5</label>

            </div> */}
            <input type="url"
                    placeholder="Image URL"
                    onChange={e => setImgURL(e.target.value)}
                    value={imgURL}>
            </input>
            <label htmlFor="review"></label>
            <textarea className={styles.content}
                      name="review"
                      onChange={e => setContent(e.target.value)}
                      required
                      placeholder="Tell us how it was!">
            </textarea>
            <button type='submit' disabled={!rating || !content ? true : false}>Submit</button>
        </form>
      </div>
    )
}
