import React from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from "../../store/modal";
import { deleteReservation } from "../../store/restaurants";
import styles from "./DeleteReservation.module.css";
import styled from 'styled-components';
import animation from "../../video/FindTable-loading.mp4";

export const DeleteReservationForm = ({reservationId}) => {
    const dispatch = useDispatch();

    const closeModal = async(e) => {
        e.preventDefault();
        await dispatch(hideModal())
    };

    const handleDelete = async(e) => {
        e.preventDefault();
        await dispatch(deleteReservation(reservationId))
        await dispatch(hideModal())
    }

    return (

    )
}
