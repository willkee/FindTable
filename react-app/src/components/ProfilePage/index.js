import React from 'react'
import { useSelector } from 'react-redux';
import { ProfileReservationCard } from "../Reservations/ProfileReservationCard"
import styled from "styled-components";
import styles from "./ProfilePage.module.css";
import { UserIconLarge } from '../Icons';
import { PageContainer } from '../PageContainer';

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
    margin-left: 40px;
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

const ContentFeed = styled.div`
    height: auto;
    width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Reservations = styled.div`
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
    cursor: pointer;
`;

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
    const reservations = Object.values(sessionUser.reservations);
    console.log(reservations)

    const memberSince = () => {
        const dateString = new Date(sessionUser.created_at).toDateString()
        const month = dateString.split(" ")[1]
        const year = dateString.split(" ")[3]
        return <span>{`${month} ${year}`}</span>
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
                            <div className={styles.button} role="button">Restaurant Reservations</div>
                            <div className={styles.button} role="button">Restaurant Reviews</div>
                        </>
                    )}
                    <div className={styles.button} role="button">My reservations</div>
                    <div className={styles.button} role="button">My Reviews</div>
                    <div className={styles.button} role="button">Favorites</div>
                </ProfileInfoBox>
                <ContentFeed>
                    <Reservations>
                        <h2><strong>Upcoming Reservations</strong></h2>
                        <hr></hr>
                        {reservations && reservations.map(reservation => (
                            <ProfileReservationCard reservation={reservation}/>
                        ))}
                    </Reservations>
                </ContentFeed>
            </MainContent>
        </PageContainer>
    )
}

export default ProfilePage
