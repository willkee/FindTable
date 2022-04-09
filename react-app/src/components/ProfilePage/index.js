import React from 'react'
import { useSelector } from 'react-redux';
import { ReservationCard } from '../ReservationCard'
import styled from "styled-components";
import styles from "./ProfilePage.module.css";
import { UserIconLarge } from '../Icons';

const Background = styled.div`className={styles.button}
    width: 1600px;
    height: auto;
    min-height: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
`;

const UserBox = styled.div`className={styles.button}
    width: 1600px;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30px;
`;

const MainContent = styled.div`className={styles.button}
    width: 1200px;
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
`;

const ContentFeed = styled.div`className={styles.button}
    width: 500px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const UpcomingReservations = styled.div`className={styles.button}
    width: 900px;
    height: auto;
    background-color: #F3F3F3;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: left;
`;

const PastReservations = styled.div`className={styles.button}
    width: 900px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: left;
`;

const ProfilePage = () => {
    const sessionUser = useSelector(state => state.session.user)

    return (
        <Background>
            <UserBox>
                <UserIconLarge style={{marginLeft: "10px"}}/>
                <h2 style={{marginLeft: "15px"}}><strong style={{fontSize: "32px"}}>{sessionUser.first_name} {sessionUser.last_name}</strong>  |  member since {sessionUser.created_at}</h2>
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
                    <UpcomingReservations>
                        <h2><strong>Upcoming Reservations</strong></h2>
                        <hr></hr>
                        <ReservationCard />
                    </UpcomingReservations>
                    <PastReservations>
                        <h2><strong>Past Reservations</strong></h2>
                        <hr></hr>
                        <ReservationCard />
                    </PastReservations>
                </ContentFeed>
            </MainContent>
        </Background>
    )
}

export default ProfilePage
