import styled from "styled-components";
import {Link} from "react-router-dom";
import { ReservationNavItem } from "../ReservationNavItem";

const ReservationDropdown = styled.div`
    width: 350px;
    position: absolute;
    height: auto;
    min-height: 100px;
    max-height: 750px;
    background-color: white;
    border: 1px solid #E1E1E1;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: left;
    padding-left: 15px;

`;

export const ReservationNav = ({reservationsArr}) => {
    const resCopy = [...reservationsArr].slice(0, 3)
    console.log(reservationsArr.length)
    if (reservationsArr.length < 1) {
        return (
            <ReservationDropdown>
                <h3>Upcoming reservations</h3>
                <hr></hr>
                <h4>You have no reservations.</h4>
            </ReservationDropdown>
        )
    } else if (reservationsArr.length < 4) {
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
    } else {
        return (
            <ReservationDropdown>
                <h3>Upcoming reservations</h3>
                <hr></hr>
                {resCopy.map(reservation => (
                    <>
                        <ReservationNavItem reservation={reservation[1]} />
                        <hr></hr>
                    </>
                ))}
                <Link to="/my-profile">View all of your reservations</Link>
            </ReservationDropdown>
        )
    }

}
