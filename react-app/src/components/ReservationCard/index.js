// import styles from "./ReservationCard.module.css";
import styled from "styled-components";
import { GreenConfirmationButton, UserIcon, CalendarIcon, GreyVerticalLine } from "../Icons";
import styles from './ReservationCard.module.css'

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
    return (
        <ReservationContainer>
            <img src="https://www.onceuponachef.com/images/2012/11/Vanilla-Birthday-Cake-18.jpg" alt="Restaurant for <restaurant name>."></img>
            <ReservationDetails>
                <strong>Restaurant name - City, State | Borough</strong>
                <IconTextBox>
                    <GreenConfirmationButton />
                    <p>Reservation confirmed</p>
                </IconTextBox>
                <IconTextBox>
                    <UserIcon />
                    <p>reservation.num_people</p>
                    <CalendarIcon />
                    <p>reservation.date, at reservation.time AM/PM</p>
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
