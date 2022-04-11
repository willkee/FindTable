import styled from "styled-components";
import styles from "./MyReservations.module.css";
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { ProfileReservationCard } from "../../../Reservations/ProfileReservationCard";

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
    position: relative;
    cursor: pointer;
`;

const ContentFeed = styled.div`
    height: auto;
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const MyReservations = () => {
    const sessionUser = useSelector(state => state.session.user);
    const reservations = Object.values(sessionUser.reservations);

    return (
        <ContentFeed>
            <Reservations>
                <h2><strong>Upcoming Reservations</strong></h2>
                <hr></hr>
                {reservations && reservations.map(reservation => (
                    <ProfileReservationCard reservation={reservation}/>
                ))}
            </Reservations>
        </ContentFeed>

    )
}
