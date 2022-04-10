import React from 'react';
import styled from "styled-components";
import { RestaurantCircle, UserIcon, ClockIcon, CalendarIconSmall  } from "../../Icons";
import { useSelector } from "react-redux";
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
`;

export const ReservationNavItem = ({reservation}) => {
    const restaurant = useSelector(state => state.restaurants)[reservation.restaurant_id];

    let people;
    reservation.num_people === 1 ? people = " person" : people = " people"

<<<<<<< HEAD
    const showCancelModal = (e) => {
        e.preventDefault();


    }

=======
>>>>>>> reservation-test
    return (
        <ReservationContainer>
            <RestaurantCircle />
            <ReservationInfo>
                <Row>{restaurant.name} - {restaurant.street_address}</Row>
                <Row>
                    <UserIcon />
                    <h4>Table for {reservation.num_people}{people}.</h4>
                </Row>
                <Row>
                    <ClockIcon />
                    <h4> </h4>
                </Row>
                <Row>
                    <CalendarIconSmall />
                    <h4>{reservation.date.slice(0, 16)}</h4>
                </Row>
                <Row>
<<<<<<< HEAD
                    <Link to="/my-profile">View</Link>
                    <Link to={`/my_reservations/${reservation.id}`}>Modify</Link>
=======
                    <Link style={{color: "#4895FD", textDecoration: "none"}} to={`/my_reservations/${reservation.id}`}>View</Link>
                    <h5>|</h5>
                    <Link style={{color: "#4895FD", textDecoration: "none"}} to={`/my_reservations/${reservation.id}`}>Modify</Link>
>>>>>>> reservation-test
                </Row>
                <DeleteReservation reservationId={reservation.id} />
            </ReservationInfo>
        </ReservationContainer>

    )
}
