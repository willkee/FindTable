import styled from "styled-components";
import {Link} from "reat-router-dom";
import { ReservationNavItem } from "../ReservationNavItem";

const ReservationDropdown = styled.div`
    width: 350px;
    height: auto;
    min-height: 100px;
    background-color: white;
    border: 1px solid #707070;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: left;
`;

export const ReservationNav = ({reservationsArr}) => {

    if (!reservationsArr.length) {
        return (
            <ReservationDropdown>
                <h3>Upcoming reservations</h3>
                <hr></hr>
                <h4>You have no reservations.</h4>
            </ReservationDropdown>
        )
    } else {
       return (
            <ReservationDropdown>
                <h3>Upcoming reservations</h3>
                <hr></hr>
                {reservationsArr.map(reservation => (
                    <>
                        <ReservationNavItem reservation={reservation[1]} />
                        <hr></hr>
                    </>
                ))}
                <Link to="/my-profile" />
            </ReservationDropdown>
        )
    }

}
