import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom';
import './Modal.css'

import { hideModal } from '../../store/modal';

export const Modal = () => {
    const dispatch = useDispatch()

    const mount = useSelector(state => state.modals.modalMount)
    const display = useSelector(state => state.modals.display)
    const Current = useSelector(state => state.modals.currentModal)

    const closeModal = () => {
        dispatch(hideModal())
    }

    return display && mount && ReactDOM.createPortal(
        <div className='modal-background' onClick={closeModal}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <Current />
            </div>
        </div>
        , mount)
}

export default Modal;
