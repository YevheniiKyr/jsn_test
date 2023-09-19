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
                style = {{margin: '0.5rem', color: "white", background: 'rgb(96,115,210)', border: "none"}}
                size={'lg'}
                onClick={() => setModalVisible(true)}
            >
                 new hero </Button>
        </Col>
        <AddHeroModal show={modalVisible} onHide={()=>setModalVisible(false)}/>
        </Container>
    );
};

export default AddHero;