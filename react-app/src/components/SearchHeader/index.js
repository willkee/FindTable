import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./SearchHeader.module.css";

const SearchHeader = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const history = useHistory();

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
		return;
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSubmit(e);
		}
	};

	return (
		<div className={styles.search_header}>
			<h1>Find your table for any occasion</h1>
			<div>
				<div className={styles.search_inputs}>
					<div className={styles.search_inner_div}>
						<input
							className={styles.search_box_field}
							id="searchbox"
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder="Search"
						></input>
					</div>
				</div>
				<div onClick={handleSubmit} className={styles.search_button}>
					Let's Go
				</div>
			</div>
		</div>
	);
};

export default SearchHeader;
