import React from 'react';
import {Button, Container, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {SUPERHERO_ROUTE} from "../../utils/constRoutes";

const SuccessModal = ({show, onHide, message, heroId, onHideOuterModal, updated}) => {

    const navigate = useNavigate()
    const hideAll = () => {
        updated()
        onHide()
        onHideOuterModal()
    }
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
                    <Button style={{marginRight: '3rem'}} variant="outline-success" onClick={hideAll}>Ok</Button>
                    {
                        heroId &&
                        (
                            <Button style={{marginRight: '3rem'}} variant="outline-info" onClick={
                                () => {
                                    navigate(SUPERHERO_ROUTE + '/' + heroId)
                                    onHide()
                                    onHideOuterModal()
                                }
                            }>
                                Hero page</Button>
                        )
                    }
                </Container>
            </Modal.Footer>
        </Modal>
    );
}

export default SuccessModal;