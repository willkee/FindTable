import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import styles from "./ProfilePage.module.css";
import { UserIconLarge } from "../Icons";
import { Favorites } from "./Tabs/Favorites/index.js";
import { MyReviews } from "./Tabs/MyReviews/index.js";
import { MyReservations } from "./Tabs/MyReservations";
import { RestaurantReservations } from "./Tabs/RestaurantReservations/index.js";
import { RestaurantReviews } from "./Tabs/RestaurantReviews/index.js";

const PageContainer = styled.div`
	width: 85vw;
	min-height: 99vh;
	height: auto;
	display: flex;
	flex-direction: column;
	top: 55px;
	align-items: center;
	background-color: white;
	padding-bottom: 65px;
	filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
`;

const UserBox = styled.div`className={styles.button}
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30px;
    border-bottom: 1px solid #E7E7E7;
`;

const MainContent = styled.div`className={styles.button}
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: top;
`;

const ProfileInfoBox = styled.aside`
	width: 275px;
	height: 300px;
	display: flex;
	flex-direction: column;
	position: relative;
	top: 30px;
	left: 30px;
`;

const TabContent = styled.div`
	width: 600px;
	border-left: 1px solid #c7c7c7;
	margin-left: 200px;
	padding-left: 20px;
`;

const ProfilePage = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const [selected, setSelected] = useState(<MyReservations />);

	const memberSince = () => {
		const dateString = new Date(sessionUser.created_at).toDateString();
		const month = dateString.split(" ")[1];
		const year = dateString.split(" ")[3];
		return <span>{`${month} ${year}`}</span>;
	};

	const onClickRestReservations = () => {
		setSelected(<RestaurantReservations />);
		if (sessionUser.business_owner) {
			let tab1 = document?.getElementById("tab1");
			let tab2 = document?.getElementById("tab2");
			tab1.style.color = "#FC6260";
			tab2.style.color = "black";
		}
		let tab3 = document?.getElementById("tab3");
		let tab4 = document?.getElementById("tab4");
		let tab5 = document?.getElementById("tab5");
		tab3.style.color = "black";
		tab4.style.color = "black";
		tab5.style.color = "black";
	};

	const onClickRestReviews = () => {
		setSelected(<RestaurantReviews />);
		if (sessionUser.business_owner) {
			let tab1 = document?.getElementById("tab1");
			let tab2 = document?.getElementById("tab2");
			tab1.style.color = "black";
			tab2.style.color = "#FC6260";
		}
		let tab3 = document?.getElementById("tab3");
		let tab4 = document?.getElementById("tab4");
		let tab5 = document?.getElementById("tab5");
		tab3.style.color = "black";
		tab4.style.color = "black";
		tab5.style.color = "black";
	};

	const onClickMyReservations = () => {
		setSelected(<MyReservations />);
		if (sessionUser.business_owner) {
			let tab1 = document?.getElementById("tab1");
			let tab2 = document?.getElementById("tab2");
			tab1.style.color = "black";
			tab2.style.color = "black";
		}
		let tab3 = document?.getElementById("tab3");
		let tab4 = document?.getElementById("tab4");
		let tab5 = document?.getElementById("tab5");

		tab3.style.color = "#FC6260";
		tab4.style.color = "black";
		tab5.style.color = "black";
	};

	const onClickMyReviews = () => {
		setSelected(<MyReviews />);
		if (sessionUser.business_owner) {
			let tab1 = document?.getElementById("tab1");
			let tab2 = document?.getElementById("tab2");
			tab1.style.color = "black";
			tab2.style.color = "black";
		}
		let tab3 = document?.getElementById("tab3");
		let tab4 = document?.getElementById("tab4");
		let tab5 = document?.getElementById("tab5");

		tab3.style.color = "black";
		tab4.style.color = "#FC6260";
		tab5.style.color = "black";
	};

	const onClickFavorites = () => {
		setSelected(<Favorites />);
		if (sessionUser.business_owner) {
			let tab1 = document?.getElementById("tab1");
			let tab2 = document?.getElementById("tab2");
			tab1.style.color = "black";
			tab2.style.color = "black";
		}
		let tab3 = document?.getElementById("tab3");
		let tab4 = document?.getElementById("tab4");
		let tab5 = document?.getElementById("tab5");
		tab3.style.color = "black";
		tab4.style.color = "black";
		tab5.style.color = "#FC6260";
	};

	return (
		<PageContainer>
			<UserBox>
				<UserIconLarge style={{ marginLeft: "10px" }} />
				<h2 style={{ margin: "0px", width: "500px", padding: "0px" }}>
					<strong style={{ fontSize: "32px" }}>
						{sessionUser.first_name} {sessionUser.last_name}
					</strong>{" "}
					| member since {memberSince()}
				</h2>
			</UserBox>
			<MainContent>
				<ProfileInfoBox>
					{sessionUser.business_owner && (
						<>
							<div
								className={styles.button}
								id="tab1"
								onClick={() => onClickRestReservations()}
							>
								My Restaurants' Reservations
							</div>
							<div
								className={styles.button}
								id="tab2"
								onClick={() => onClickRestReviews()}
							>
								My Restaurants' Reviews
							</div>
						</>
					)}
					<div
						className={styles.button}
						style={{ color: "#FC6260" }}
						id="tab3"
						onClick={() => onClickMyReservations()}
					>
						My Reservations
					</div>
					<div
						className={styles.button}
						id="tab4"
						onClick={() => onClickMyReviews()}
					>
						My Reviews
					</div>
					<div
						className={styles.button}
						id="tab5"
						onClick={() => onClickFavorites()}
					>
						Favorites
					</div>
				</ProfileInfoBox>
				<TabContent>{selected}</TabContent>
			</MainContent>
		</PageContainer>
	);
};

export default ProfilePage;
