import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Row} from "react-bootstrap";
import {updateHero} from "../../api/heroApi";
import DangerModal from "../../components/modals/dangerModal";
import SuccessModal from "../../components/modals/successModal";
import EditableImage from "../../components/editableImage";
import ListWithAdd from "../../components/listWithAdd";

const EditHeroModal = ({show, onHide, hero, updated}) => {

    const [name, setName] = useState(hero.nickname)
    const [realName, setRealName] = useState(hero.real_name)
    const [originDesc, setOriginDesc] = useState(hero.origin_description)
    const [superpowers, setSuperpowers] = useState(hero.superpowers)
    const [catch_phrase, setCatchPhrase] = useState(hero.catch_phrase)
    const [fileNames, setFileNames] = useState(hero.images)
    const [newFiles, setNewFiles] = useState([])
    const [errorVisible, setErrorVisible] = useState(false)
    const [successVisible, setSuccessVisible] = useState(false)
    const [newPower, setNewPower] = useState('')
    const [openedImage, setOpenedImage] = useState('')

    useEffect(() => {
        setNewFiles([])
        setNewPower('')
        setName(hero.nickname)
        setSuperpowers(hero.superpowers)
        setOpenedImage('')
        setCatchPhrase(hero.catch_phrase)
        setOriginDesc(hero.origin_description)
        setRealName(hero.real_name)
        setFileNames(hero.images)
    }, [hero])

    const changePower = (idx, value) => {
        setSuperpowers(superpowers.map((power, power_idx) => power_idx === idx ? value : power))
    }
    const addPower = () => {
        setSuperpowers([...superpowers, newPower])
        setNewPower('')
    }
    const deletePower = (idx) => {
        setSuperpowers(superpowers.filter((power, power_idx) => power_idx !== idx))
    }
    const selectFile = e => {
        setNewFiles([...newFiles, ...e.target.files])

    }

    const removeOldFile = (fileName) => {
        setFileNames(fileNames.filter(file => file !== fileName))
    }

    const removeNewImage = (fileName) => {
        setNewFiles(newFiles.filter(file => file.name !== fileName))
    }


    const editHero = () => {
        const heroData = new FormData();
        heroData.append('nickname', name)
        heroData.append('real_name', realName)
        heroData.append('origin_description', originDesc)
        heroData.append('superpowers', JSON.stringify(superpowers))
        heroData.append('catch_phrase', catch_phrase)

        for (const fileName of fileNames) {
            heroData.append('old_file_names', fileName);
        }

        for (const newFile of newFiles) {
            heroData.append('images', newFile)
        }

        updateHero(hero._id, heroData).then(() => {
            setSuccessVisible(true)
        })
            .catch(() => {
                setErrorVisible(true)
            })
            .finally(() => {
            })
    }


    return (

        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit hero
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-2"
                        placeholder="Input nickname (e.g Superman)"
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
                        value={catch_phrase}
                        onChange={e => setCatchPhrase(e.target.value)}
                        className="mt-2"
                        placeholder="Input catch phrase"
                    />
                    <ListWithAdd
                        listName={'Superpowers'}
                        list={superpowers}
                        addItem={addPower}
                        deleteItem={deletePower}
                        changeItem={changePower}
                        setNewItem={setNewPower}
                        newItem={newPower}
                    />
                    <Row style={{marginTop: '1rem'}}>
                        <h5 style={{marginTop: '0.75rem'}}>Images</h5>
                        {fileNames.map(file =>
                            <EditableImage
                                key={file}
                                onDeleteClick={() => removeOldFile(file)}
                                image={file}
                                url={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/c_scale/${file}`}
                            />)}
                    </Row>
                    <Row style={{marginTop: '1rem'}}>
                        <h5 style={{marginTop: '0.75rem'}}>Images you want to add</h5>
                        {newFiles.length > 0
                            && newFiles.map((image, index) => (
                                    <EditableImage
                                        onDeleteClick={() => removeNewImage(image.name)}
                                        image={image}
                                        key={image.name}
                                    />
                                )
                            )
                        }
                    </Row>
                    <img
                        src={process.env.REACT_APP_API_URL + openedImage}
                        alt={openedImage}
                        width={'400px'}
                        height={'400px'}
                        style={{display: openedImage ? "block" : 'none', marginTop: '1rem'}}
                    />
                    <Form.Control
                        placeholder='Choose file'
                        className="mt-3"
                        type="file"
                        multiple
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={editHero}>Save</Button>
            </Modal.Footer>

            <DangerModal
                message={'Cant update hero with this fields'}
                onHide={() => {
                    setErrorVisible(false)
                }}
                closeButtonText={"Close"}
                // onHideOuterModal={onHide}
                show={errorVisible}
            />

            <SuccessModal
                message={'Hero has been successfully updated. '}
                onHide={() => {
                    setSuccessVisible(false)
                }}
                updated={updated}
                onHideOuterModal={onHide}
                show={successVisible}/>
        </Modal>

    );
}


export default EditHeroModal;