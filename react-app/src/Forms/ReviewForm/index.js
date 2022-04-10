import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ReviewForm.module.css";
import { createReview } from "../../store/restaurants";
import { allUsers } from "../../store/users";

export const ReviewForm = ({ restaurant, review }) => {
	const [rating, setRating] = useState(1);
	const [content, setContent] = useState("");
	const [imgURL, setImgURL] = useState("");
	const [errors, setErrors] = useState([]);
	console.log(review, "SDFSDFSDF");
	// const [star, setStar] = useState(<OutlineGreyStar />)
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (review) {
			setContent(review.review);
			setImgURL(review.img_url);
			setRating(review.stars);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = {
			user_id: user.id,
			restaurant_id: restaurant.id,
			stars: rating,
			img_url: imgURL,
			review: content,
		};
		setRating(1);
		setContent("");
		setImgURL("");
		const data = await dispatch(createReview(formData)).then(() =>
			dispatch(allUsers())
		);
		if (data) return setErrors(data);
	};

	const handleReset = (e) => {
		e.preventDefault();
		setRating(1);
		setContent("");
		setImgURL("");
	};

	console.log(rating);

	return (
		<div className={styles.review_form_parent}>
			<div className={styles.reviewHeader}>
				<div>
					<strong>
						Hi {user?.first_name}, how was your experience?
					</strong>
				</div>
				{errors.length > 0 && (
					<div className={styles.error_container}>
						{errors.map((error) => (
							<div key={error}>{error.split(":")[1]}</div>
						))}
					</div>
				)}
			</div>
			<form className={styles.reviewContainer}>
				<div className={styles.sub1}>
					{imgURL ? (
						<img
							src={imgURL}
							alt=""
							height="190px"
							width="190px"
							className={styles.image}
						/>
					) : (
						<img
							className={styles.img_placeholder}
							src="https://customercare.igloosoftware.com/.api2/api/v1/communities/10068556/previews/thumbnails/4fc20722-5368-e911-80d5-b82a72db46f2?width=680&height=680&crop=False"
							alt="Preview"
						/>
					)}
				</div>

				<div className={styles.sub2}>
					<div className={styles.rating_container}>
						<strong>Rate your experience</strong>
						<div>
							<select
								value={rating}
								onChange={(e) => setRating(e.target.value)}
								required
							>
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
					</div>

					<div className={styles.textbox}>
						<textarea
							className={styles.content}
							name="review"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							required
							placeholder="Tell us how it was!"
						></textarea>
					</div>

					<div>
						<input
							type="url"
							placeholder="Enter your image URL"
							onChange={(e) => setImgURL(e.target.value)}
							value={imgURL}
							className={styles.url}
						></input>
					</div>

					<div className={styles.reset_submit}>
						<div
							className={styles.reset}
							role="button"
							onClick={handleReset}
						>
							Reset
						</div>
						<div
							className={styles.submit}
							role="button"
							onClick={handleSubmit}
							disabled={!rating || !content ? true : false}
						>
							Submit
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
