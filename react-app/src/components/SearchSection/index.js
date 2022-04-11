import styles from "./SearchSection.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { hideModal } from "../../store/modal";

const SearchSection = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (searchQuery.includes("%")) {
			alert(
				`Please do not use the "percent" symbol in your search query.`
			);
			setSearchQuery("");
		} else if (searchQuery) {
			history.push(`/search/${searchQuery}`);
		} else {
			alert(`Please enter a search query.`);
		}

		dispatch(hideModal());
		return;
	};

	return (
		<div className={styles.container}>
			<h1>Find your table for any occasion</h1>
			<div className={styles.sub_parent}>
				<div>
					<input
						className={styles.search_box_field}
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search"
					/>
				</div>
				<div onClick={handleSubmit} className={styles.search_button}>
					Let's Go
				</div>
			</div>
		</div>
	);
};

export default SearchSection;
