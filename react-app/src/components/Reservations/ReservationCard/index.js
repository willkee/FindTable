import styles from "./ReservationCard.module.css";
import styled from "styled-components";
import { GreenConfirmationButton, UserIcon, CalendarIconSmall, GreyVerticalLine } from "../../Icons";
import { useSelector } from "react-redux";

const ReservationContainer = styled.div`
    width: 540px;
    height: 130px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ReservationDetails = styled.div`
    width: 380px;
    height: 125px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
`;

const IconTextBox = styled.div`
    width: 250px;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const ActionBox = styled.div`
    width: 110px;
    height: 25px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ModalButton = styled.button`
    color: #D24E65;
    font-size: 14px;
    background-color: rgba(255, 255, 255, 0);
    border: none;
`;


export const ReservationCard = ({reservation}) => {
    const user = useSelector(state => state.session.user);
    const restaurants = useSelector(state => state.restaurants);
    const restaurant = restaurants[reservation.restaurant_id];

    let resTime;
    let timeUnit;

    reservation.time.includes(".5") ? resTime = reservation.time.replace(/.5/, ":30") : resTime = reservation.time;
    reservation.time.length < 2 || reservation.time === "11" || reservation.time === "11.5" ? timeUnit = 'AM' : timeUnit = 'PM';



    return (
        <ReservationContainer>
            <img src={restaurant.img_url} alt={`Restaurant image for ${restaurant.name}`}></img>
            <ReservationDetails>
                <strong>{restaurant.name} - {restaurant.street_address} | {restaurant.borough}</strong>
                <IconTextBox>
                    <GreenConfirmationButton />
                    <h4>Reservation confirmed</h4>
                </IconTextBox>
                <IconTextBox>
                    <UserIcon />
                    <h4 className={styles.people}>{reservation.num_people}</h4>
                    <div className={styles.res}>
                        <CalendarIconSmall />
                        <h4>{reservation.date.slice(0, 16)}, at {resTime}{timeUnit}</h4>
                    </div>
                </IconTextBox>
                <ActionBox>
                   <ModalButton>Modify</ModalButton>
                    <GreyVerticalLine />
                    <ModalButton>Cancel</ModalButton>
                </ActionBox>
            </ReservationDetails>
        </ReservationContainer>
    )
}
