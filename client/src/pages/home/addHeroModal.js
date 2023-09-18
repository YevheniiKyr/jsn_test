import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createHero} from "../../api/heroApi";
import ErrorModal from "./errorModal";
import SuccessModal from "./successModal";

const AddHeroModal = ({show, onHide}) => {

    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [realName, setRealName] = useState('')
    const [originDesc, setOriginDesc] = useState('')
    const [superpowers, setSuperpowers] = useState([])
    const [catch_phrase, setCatch_phrase] = useState('')
    const [files, setFiles] = useState()
    const [errorVisible, setErrorVisible] = useState(false)
    const [successVisible, setSuccessVisible] = useState(false)
    const [heroId, setHeroId] = useState()

    useEffect(() => {

    }, [error])
    const selectFile = e => {
        setFiles(e.target.files)
    }
    const addHero = () => {
        const heroData = new FormData();
        heroData.append('nick_name', name)
        heroData.append('real_name', realName)
        heroData.append('origin_description', originDesc)
        heroData.append('images', files)
        heroData.append('superpowers', JSON.stringify(superpowers))
        heroData.append('catch_phrase', catch_phrase)
        createHero(heroData).then(
            data => {
                data.error ?
                    setErrorVisible(true)
                    :
                    setSuccessVisible(true)
                setHeroId(data._id)
                onHide()
            })
    }

    return (

        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create hero </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-2"
                        placeholder="Input nickname (e.g Superman)"
                        //(e.g Superman, Batman, etc.)
                    />
                    <Form.Control
                        value={realName}
                        onChange={e => setRealName(e.target.value)}
                        className="mt-2"
                        placeholder="Input real name"
                    />
                    <Form.Control
                        value={originDesc}
                        onChange={e => setOriginDesc(e.target.value)}
                        className="mt-2"
                        placeholder="Input origin"
                    />

                    <Form.Control
                        placeholder='Choose file'
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addHero}>Додати</Button>
            </Modal.Footer>

            <ErrorModal
                error={'Hero already exists. Create somebody else'}
                onHide={() => setErrorVisible(false)}
                show={errorVisible}
            />

            <SuccessModal
                heroId={heroId}
                message={'Hero has been successfully created. '}
                onHide={() => setSuccessVisible(false)}
                show={successVisible}/>

        </Modal>

    );
};

export default AddHeroModal;