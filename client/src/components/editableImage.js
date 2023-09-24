import React, {useEffect} from 'react';
import {Button, Col} from "react-bootstrap";

const EditableImage = ({onDeleteClick, image, url}) => {

    useEffect(()=>{
        console.log(image)
    })

    return (
        <Col
            key={image}
            md={4}
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: '0.5rem',
                position: 'relative'
            }}
        >
            <img
                src={ url? url : URL.createObjectURL(image)  }
                style={{cursor: "pointer"}}
                alt={'Preview '}
                width={'100px'}
                height={'100px'}
            />
            <Button
                style={{marginLeft: '4.7rem', position: 'absolute'}}
                variant={'danger'}
                size={"sm"}
                onClick={() => onDeleteClick(image.name)}
            >X</Button>
        </Col>
    );
};

export default EditableImage;