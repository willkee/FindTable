import React from 'react';
import styled from "styled-components";
import { RestaurantCircle, UserIcon, ClockIcon, CalendarIconSmall  } from "../../Icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteReservation } from "../DeleteReservation";

const ReservationContainer = styled.div`
    width: 285px;
    height: 175px;
    display: flex;
    flex-direction: row;
    hustify-content: space-between;
    align-items: top;
`;

const ReservationInfo = styled.div`
    width: 240px;
    height: 175px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: left;
`;

const Row = styled.div`
    width: 200px;
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
    margin-top: 3px;
`;

export const ReservationNavItem = ({reservation}) => {
    const dispatch = useDispatch();
    const restaurant = useSelector(state => state.restaurants)[reservation.restaurant_id];
    let people;
    let resTime;
    let timeUnit;
    reservation.num_people === 1 ? people = " person" : people = " people"
    reservation.time.includes(".5") ? resTime = reservation.time.replace(/.5/, ":30") : resTime = reservation.time;
    reservation.time.length < 2 || reservation.time === "11" || reservation.time === "11.5" ? timeUnit = 'AM' : timeUnit = 'PM';

    return (
        <ReservationContainer>
            <RestaurantCircle />
            <ReservationInfo>
                <Row><strong>{restaurant.name} - {restaurant.borough}</strong></Row>
                <Row>
                    <UserIcon />
                    <h4>Table for {reservation.num_people}{people}.</h4>
                </Row>
                <Row>
                    <ClockIcon />
                    <h4>{resTime}{timeUnit}</h4>
                </Row>
                <Row>
                    <CalendarIconSmall />
                    <h4>{reservation.date.slice(0, 16)}</h4>
                </Row>
                <Row>
                    <Link style={{color: "#4895FD", textDecoration: "none"}} to={`/my_reservations/${reservation.id}`}>View</Link>
                    <h5>|</h5>
                    <Link style={{color: "#4895FD", textDecoration: "none"}} to={`/my_reservations/${reservation.id}`}>Modify</Link>
                </Row>
                <DeleteReservation reservationId={reservation.id} />
            </ReservationInfo>
        </ReservationContainer>

    )
}
