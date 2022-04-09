import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from "./ReviewForm.module.css"
import { createReview } from '../../store/restaurants';


export const ReviewForm = ({restaurant}) => {
    const [rating, setRating] = useState(1);
    const [content, setContent] = useState("");
    const [imgURL, setImgURL] = useState("");
    // const [star, setStar] = useState(<OutlineGreyStar />)
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

    const handleReset = (e) => {
      e.preventDefault()
      setRating(1)
      setContent("")
      setImgURL("")
    }

    console.log(rating)

    return (
      <div className={styles.review_form_parent}>
        <div className={styles.reviewHeader}>
          <div>
              <strong>Hi {user?.first_name}, how was your experience?</strong>
          </div>
        </div>
        <div>
          <form className={styles.reviewContainer}>
            <div className={styles.div1}>
              {imgURL? <img src={imgURL} alt="" height="190px" width="190px" className={styles.image}/> : null}
            </div>

            <div className={styles.div2}>
              <strong>Image Preview</strong>
            </div>

            <div className={styles.div3}>
              <strong>Rate your experience</strong>
            </div>

            <div className={styles.div4}>
              <select value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required>
                <option value={1}>⭐️</option>
                <option value={2}>⭐️⭐️</option>
                <option value={3}>⭐️⭐️⭐️</option>
                <option value={4}>⭐️⭐️⭐️⭐️</option>
                <option value={5}>⭐️⭐️⭐️⭐️⭐️</option>
              </select>
              {/* <div className={styles.starsContainer}>
                  <input type="checkbox" id="star5" value={5} onClick={e => setRating(e.target.value)}/>
                  <label for="star5"></label>

                  <input type="checkbox" id="star4" value={4} onClick={e => setRating(e.target.value)}/>
                  <label for="star4"></label>

                  <input type="checkbox" id="star3" value={3} onClick={e => setRating(e.target.value)}/>
                  <label for="star3"></label>

                  <input type="checkbox" id="star2" value={2} onClick={e => setRating(e.target.value)}/>
                  <label for="star2"></label>

                  <input type="checkbox" id="star1" value={1} onClick={e => setRating(e.target.value)}/>
                  <label for="star1"></label>
              </div> */}
            </div>

            <div className={styles.div5}>
              <textarea className={styles.content}
                          name="review"
                          value={content}
                          onChange={e => setContent(e.target.value)}
                          required
                          placeholder="Tell us how it was!">
              </textarea>
            </div>

            <div className={styles.div6}>
              <input type="url"
                      placeholder="Enter your image URL"
                      onChange={e => setImgURL(e.target.value)}
                      value={imgURL}
                      className={styles.url}>
              </input>
            </div>

            <div className={styles.div7}>
              <div className={styles.reset} role='button' onClick={handleReset}>
                Reset
              </div>
            </div>

            <div className={styles.div8}>
              <div className={styles.submit} role='button' onClick={handleSubmit} disabled={!rating || !content ? true : false}>
                Submit
              </div>
            </div>

          </form>
        </div>
      </div>
    )
}
