import React from 'react';
import {Carousel, Container} from "react-bootstrap";
import styles from "./styles.module.scss";

const ImagesList = ({images}) => {

    return (
        <Carousel className={styles.carousel}>
            {images.map((image, idx) =>
                (<Carousel.Item
                    key={image}>
                    <Container fluid className={styles.carousel_image_container}>
                        <img
                            key={image}
                            className={styles.carousel_image}
                            src={process.env.REACT_APP_API_URL + image}
                            alt={`${idx}'s slide`}
                        />
                    </Container>
                </Carousel.Item>))}
        </Carousel>

    )
}
export default ImagesList;