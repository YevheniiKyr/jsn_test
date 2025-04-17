import React from 'react';
import {Carousel, Container} from "react-bootstrap";
import styles from "./styles.module.scss";
import CloudinaryImage from "../../components/CloudinaryImage";

const ImagesList = ({images}) => {

    return (
        <Carousel className={styles.carousel}>
            {images.map((image, idx) =>
                (<Carousel.Item
                    key={image}>
                    <Container fluid className={styles.carousel_image_container}>
                        <CloudinaryImage
                            publicId={image}
                            width={300}
                            height={300}
                            alt={`Image ${idx}`}
                            className={styles.image}
                        />
                    </Container>
                </Carousel.Item>))}
        </Carousel>

    )
}
export default ImagesList;