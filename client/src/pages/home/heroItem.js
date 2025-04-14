import React from 'react';
import {Card} from "react-bootstrap";
import styles from './styles.module.scss';
import {useNavigate} from "react-router-dom";
import {SUPERHERO_ROUTE} from "../../utils/constRoutes";

const HeroItem = ({hero}) => {
    const navigate = useNavigate()

    return (
            <Card
                className={styles.card}
                onClick={
                () => {
                    navigate(SUPERHERO_ROUTE + '/' + hero._id)
                }
            }>
                <Card.Img
                    src={process.env.REACT_APP_API_URL + hero.images[0]}
                    className={styles.image}
                ></Card.Img>
                <Card.Body className="p-0">
                    <Card.Title style={{
                        fontSize: '2rem',
                        textAlign: "center",
                        marginBottom: '2rem',
                    }}>
                        {hero.nickname}
                    </Card.Title>
                </Card.Body>
            </Card>
    )
};

export default HeroItem;