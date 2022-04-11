const StarCount = ({ rating }) => {
	return (
		<>
			{rating === "No Ratings" ? (
				<i className="fa-regular fa-star" />
			) : (
				""
			)}
			{rating >= 1 ? <i className="fa-solid fa-star" /> : ""}
			{rating >= 2 ? <i className="fa-solid fa-star" /> : ""}
			{rating >= 3 ? <i className="fa-solid fa-star" /> : ""}
			{rating >= 4 ? <i className="fa-solid fa-star" /> : ""}
			{rating >= 5 ? <i className="fa-solid fa-star" /> : ""}
			{rating.split(".")[1] >= 5 ? (
				<i className="fa-solid fa-star-half" />
			) : (
				""
			)}
		</>
	);
};

export default StarCount;
