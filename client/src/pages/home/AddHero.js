import React, {useState} from 'react';
import {Button, Col, Container} from "react-bootstrap";
import {AiOutlinePlusSquare} from "react-icons/ai"
import AddHeroModal from "./addHeroModal";

const AddHero = () => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <Container>
        <Col md={4} style={{display: "flex", justifyContent: "center", alignSelf: "center"}}>
            <Button
                variant={'success'}
                size={'lg'}
                onClick={() => setModalVisible(true)}
            >
                create new hero </Button>
        </Col>
        <AddHeroModal show={modalVisible} onHide={()=>setModalVisible(false)}/>
        </Container>
    );
};

export default AddHero;