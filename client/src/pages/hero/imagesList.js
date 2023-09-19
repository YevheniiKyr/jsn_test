import React from 'react';
import {Button, Carousel, Container} from "react-bootstrap";
import styles from "./styles.module.css";

const ImagesList = ({images}) => {
    return (

        <Carousel className={styles.carousel}>
            {images.map((image, idx) =>
                <Carousel.Item style={{cursor: "pointer"}} key={image}>
                    <img
                        key={image}
                        className={styles.carousel_image}
                        src={process.env.REACT_APP_API_URL + image}
                        alt={`${idx}'s slide`}
                    />
                </Carousel.Item>)
            }

        </Carousel>

    )
}
export default ImagesList;