import React from 'react';
import {Button, Container, Modal} from "react-bootstrap";

const ErrorModal = ({show, onHide, error}) => {


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >

            <Modal.Body style={{textAlign: 'center'}}>
                {error}
            </Modal.Body>
            <Modal.Footer>
                <Container className={'d-flex justify-content-center'}>
                    <Button style={{marginRight: '3rem'}} variant="outline-danger" onClick={
                        onHide
                    }>Закрити</Button>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}

export default ErrorModal;