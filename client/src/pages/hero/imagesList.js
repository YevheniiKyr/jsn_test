import React from 'react';
import {Carousel} from "react-bootstrap";
import styles from "./styles.module.css";

const ImagesList = ({images}) => {
    return (
        <Carousel className={styles.carousel} style={{marginTop: '3rem'}}>
            {images.map((image, idx) =>
                <Carousel.Item>
                    <img
                        className={styles.carousel_image}
                        src={process.env.REACT_APP_API_URL + image}
                        alt={`${idx}'s slide`}
                    />
                </Carousel.Item>)}
        </Carousel>
    )
}
export default ImagesList;