import styled from "styled-components";
import { ReservationCard } from "../../ReservationCard";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
    width: 1600px;
    height: auto;
    min-height: 950px;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: top;
    justify-content: flex-start;
`;
const ReservationContainer = styled.div`
    width: 700px;
    height: auto;
    min-height: 950px;;
    background-color: #F3F3F3;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: left;
`

export const MyReservations = () => {
    const reservationId = useParams();

    return (
        <Wrapper>
            <aside></aside>
            <ReservationContainer reservationId={reservationId}>
                <ReservationCard
            </ReservationContainer>
        </Wrapper>

    )
}
