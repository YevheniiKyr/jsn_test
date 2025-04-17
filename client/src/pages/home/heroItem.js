import React from 'react';
import {Card} from "react-bootstrap";
import styles from './styles.module.scss';
import {useNavigate} from "react-router-dom";
import {SUPERHERO_ROUTE} from "../../utils/constRoutes";
import CloudinaryImage from "../../components/CloudinaryImage";

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
            <CloudinaryImage
                publicId={hero.images[0]}
                width={300}
                height={300}
                alt={`Image of ${hero.nickname}`}
                styles={styles.image}
            />
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