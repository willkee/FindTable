import React from 'react'
import { ReservationCard } from '../ReservationCard'
import styled from "styled-components";
import { UserIcon } from '../Icons';

const ProfileBackground = styled.div`
    width: 1600px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    background-color: white;
`;

const UserBox = styled.div`
    width: 1600px;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const ProfileInfoBox = styled.aside`
    width: 275px;
    height: 300px;
    display: flex;
    flex-direction: column;
`;

const ContentFeed = styled.div`
    width: 900px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
`;

const UpcomingReservations = styled.div`
    width: 900px;
    height: auto;
    background-color: grey;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: left;
`;

const PastReservations = styled.div`
    width: 900px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: left;
`;

const ProfilePage = () => {
    return (
        <ProfileBackground>
            <UserBox>
                <UserIcon />
                <p><strong>User firstname lastname</strong>| member since createdAt</p>
            </UserBox>
            <ProfileInfoBox>
                {sessionUser.business_owner && (
                    <>
                        <button>Restaurant Reservations</button>
                        <button>Restaurant Reviews</button>
                    </>
                )}
                <button>My reservations</button>
                <button>My Reviews</button>
                <button>Favorites</button>
            </ProfileInfoBox>
            <ContentFeed>
                <UpcomingReservations>
                    <p><strong>Upcoming Reservations</strong></p>
                    <hr></hr>
                    <ReservationCard />
                </UpcomingReservations>
                <PastReservations>
                    <h1>Create anew component</h1>
                </PastReservations>
            </ContentFeed>
           <PageContainer>
            <h1>Profile Page</h1>
            <ReservationCard />
            </PageContainer>
        </ProfileBackground>
    )
}

export default ProfilePage
