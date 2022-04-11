import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../store/modal";
import styles from "./EditReviewForm.module.css";
import { updateReview } from "../../store/restaurants";

const EditReviewForm = ({ review }) => {
	const [rating, setRating] = useState(review.stars);
	const [content, setContent] = useState(review.review);
	const [imgURL, setImgURL] = useState(review.img_url);
	const [errors, setErrors] = useState([]);

	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (review) {
			setContent(review.review);
			setImgURL(review.img_url);
			setRating(review.stars);
		}
	}, [review]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = {
			id: review.id,
			user_id: user.id,
			restaurant_id: review.restaurant_id,
			stars: rating,
			img_url: imgURL,
			review: content,
		};

		const data = await dispatch(updateReview(formData));

		if (data.errors) {
			return setErrors(data.errors);
		}
		return dispatch(hideModal());
	};

	// console.log(rating);

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
							alt="review"
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
							onClick={() => dispatch(hideModal())}
						>
							Cancel
						</div>
						<div
							className={styles.submit}
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

export default EditReviewForm;
