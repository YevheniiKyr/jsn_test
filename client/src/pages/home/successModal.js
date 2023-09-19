import React from 'react';
import {Button, Container, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {SUPERHERO_ROUTE} from "../../utils/constRoutes";

const SuccessModal = ({show, onHide, message, heroId}) => {

    const navigate = useNavigate()
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
                    <Button style={{marginRight: '3rem'}} variant="outline-success" onClick={onHide}>Ok</Button>
                    <Button style={{marginRight: '3rem'}} variant="outline-info" onClick={
                        () => {
                            navigate(SUPERHERO_ROUTE + '/' + heroId)
                            onHide()
                        }
                        // onHide
                    }>Hero page</Button>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}

export default SuccessModal;