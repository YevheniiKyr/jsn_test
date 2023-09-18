import React from 'react';
import {Card, Col, Container} from "react-bootstrap";
import styles from './styles.module.css';
import {useNavigate} from "react-router-dom";
import {SUPERHERO_ROUTE} from "../../utils/constRoutes";

const HeroItem = ({hero}) => {
    const navigate = useNavigate()

    return (

        <Col md = {4} style={{display: "flex", justifyContent:"center"}}>
            <Card className={styles.card} onClick={
                () => {
                    navigate(SUPERHERO_ROUTE + '/' + hero._id)
                }
            }>
                <Card.Img
                    src={process.env.REACT_APP_API_URL + hero.images[0]}
                    className={styles.image}
                ></Card.Img>
                <Card.Body>
                    <Card.Title style={{fontSize: '2rem', display: 'flex', justifyContent: 'center'}}>
                        {hero.nickname}
                    </Card.Title>
                </Card.Body>
            </Card>
        </Col>

    )
        ;
};

export default HeroItem;