import styled from "styled-components";
import {Link} from "react-router-dom";
import { ReservationNavItem } from "../ReservationNavItem";

const ReservationDropdown = styled.div`
    width: 300px;
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
    margin-left: -273px;
`;

const HorizontalLine = styled.hr`
    width: 299px;
    height: 1px;
    margin-left: -15px;
    margin-top: -10px;
`

export const ReservationNav = ({reservationsArr}) => {
    const resCopy = [...reservationsArr].slice(0, 3)
    if (reservationsArr.length < 1) {
        return (
            <ReservationDropdown>
                <h3>Upcoming reservations</h3>
                <HorizontalLine />
                <h4>You have no reservations.</h4>
            </ReservationDropdown>
        )
    } else if (reservationsArr.length < 4) {
       return (
            <ReservationDropdown>
                <h3>Upcoming reservations</h3>
                <HorizontalLine />
                {reservationsArr.map(reservation => (
                    <>
                        <ReservationNavItem reservation={reservation[1]} />
                        <HorizontalLine />
                    </>
                ))}
                <Link to="/my-profile">View all of your reservations</Link>
            </ReservationDropdown>
        )
    } else {
        return (
            <ReservationDropdown>
                <h3>Upcoming reservations</h3>
                <HorizontalLine />
                {resCopy.map(reservation => (
                    <>
                        <ReservationNavItem reservation={reservation[1]} />
                        <HorizontalLine />
                    </>
                ))}
                <Link to="/my-profile">View all of your reservations</Link>
            </ReservationDropdown>
        )
    }

}
