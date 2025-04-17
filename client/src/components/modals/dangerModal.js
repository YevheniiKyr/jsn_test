import React from 'react';
import {Button, Container, Modal} from "react-bootstrap";

const DangerModal = ({show, onHide, message, closeButtonText}) => {


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Body style={{textAlign: 'center'}}>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Container className={'d-flex justify-content-center'}>
                    <Button style={{marginRight: '3rem'}} variant="outline-danger" onClick={
                        onHide
                    }>{closeButtonText}</Button>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}

export default DangerModal;