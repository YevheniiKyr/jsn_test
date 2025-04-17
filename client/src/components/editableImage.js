import React from 'react';
import {Button, Col} from "react-bootstrap";

const EditableImage = ({onDeleteClick, image, url}) => {

    return (
        <Col
            key={image}
            md={4}
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: '0.5rem',
                position: 'relative',
                padding: 0
            }}
        >
            <img
                src={ url? url : URL.createObjectURL(image)  }
                style={{cursor: "pointer", objectFit: "contain", width: '100%'}}
                alt={'Preview '}
            />
            <Button
                style={{right: '0', position: 'absolute', borderRadius: 0}}
                variant={'danger'}
                size={"sm"}
                onClick={() => onDeleteClick(image.name)}
            >X</Button>
        </Col>
    );
};

export default EditableImage;