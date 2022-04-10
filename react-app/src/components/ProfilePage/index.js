import React from 'react'
import { useSelector } from 'react-redux';
import { ReservationCard } from "../Reservations/ReservationCard"
import styled from "styled-components";
import styles from "./ProfilePage.module.css";
import { UserIconLarge } from '../Icons';
import { PageContainer } from '../PageContainer';
import { useState } from 'react';

// const Background = styled.div`className={styles.button}
//     width: 100%;
//     height: auto;
//     min-height: 1000px;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;
//     align-items: center;
//     background-color: white;
// `;

const UserBox = styled.div`className={styles.button}
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30px;
`;

const MainContent = styled.div`className={styles.button}
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

const ContentFeed = styled.div`className={styles.button}
    height: auto;
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const Reservations = styled.div`className={styles.button}
    width: 900px;
    height: auto;
    background-color: #F3F3F3;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 20px;
    align-items: left;
    padding: 10px 30px;
    position: relative;
`;

const TabContent = styled.div`
    width: 600px;

`


// const PastReservations = styled.div`className={styles.button}
//     width: 900px;
//     height: auto;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-around;
//     align-items: left;
// `;

const ProfilePage = () => {
    const sessionUser = useSelector(state => state.session.user)
    const reservations = sessionUser.reservations;
    const reservationsArr = Object.entries(reservations)
    const [selected, setSelected] = useState(null);


    const memberSince = () => {
        const dateString = new Date(sessionUser.created_at).toDateString()
        const month = dateString.split(" ")[1]
        const year = dateString.split(" ")[3]
        return <span>{`${month} ${year}`}</span>
    }

    const onClickRestReservations = () => {
      setSelected(<h1>rest res</h1>)
    }

    const onClickRestReviews = () => {
      setSelected(<h1>rest reviews</h1>)

    }

    const onClickMyReservations = () => {
      setSelected(<h1>my res</h1>)

    }

    const onClickMyReviews = () => {
      setSelected(<h1>my reviews</h1>)

    }

    const onClickFavorites = () => {
      setSelected(<h1>favorites</h1>)

    }



    return (
        <PageContainer>
            <UserBox>
                <UserIconLarge style={{marginLeft: "10px"}}/>
                <h2 style={{marginLeft: "15px"}}><strong style={{fontSize: "32px"}}>{sessionUser.first_name} {sessionUser.last_name}</strong>  |  member since {memberSince()}</h2>
            </UserBox>
            <MainContent>
                <ProfileInfoBox>
                    {sessionUser.business_owner && (
                        <>
                            <div className={styles.button} onClick={() => onClickRestReservations()}>Restaurant Reservations</div>
                            <div className={styles.button} onClick={() => onClickRestReviews()}>Restaurant Reviews</div>
                        </>
                    )}
                    <div className={styles.button} onClick={() => onClickMyReservations()}>My reservations</div>
                    <div className={styles.button} onClick={() => onClickMyReviews()}>My Reviews</div>
                    <div className={styles.button} onClick={() => onClickFavorites()}>Favorites</div>
                </ProfileInfoBox>
                <TabContent>
                  {selected}
                </TabContent>
                <ContentFeed>
                    <Reservations>
                        <h2><strong>Upcoming Reservations</strong></h2>
                        <hr></hr>
                        {reservationsArr && reservationsArr.map(reservation => (
                            <ReservationCard reservation={reservation[1]}/>
                        ))}
                    </Reservations>
                </ContentFeed>
            </MainContent>
        </PageContainer>
    )
}

export default ProfilePage
