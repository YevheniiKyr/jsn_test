import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createHero} from "../../api/heroApi";
import ErrorModal from "../../components/modals/errorModal";
import SuccessModal from "../../components/modals/successModal";
import ListWithAdd from "../../components/listWithAdd";

const AddHeroModal = ({show, onHide}) => {

        const [name, setName] = useState('')
        const [realName, setRealName] = useState('')
        const [originDesc, setOriginDesc] = useState('')
        const [superpowers, setSuperpowers] = useState([])
        const [catch_phrase, setCatchPhrase] = useState('')
        const [files, setFiles] = useState([])
        const [errorVisible, setErrorVisible] = useState(false)
        const [successVisible, setSuccessVisible] = useState(false)
        const [heroId, setHeroId] = useState()
        const [newPower, setNewPower] = useState('')

        useEffect(() => {
        }, [])

        const changePower = (idx, value) => {
            setSuperpowers(superpowers.map((power, power_idx) =>
                power_idx === idx ? value : power
            ))
        }
        const addPower = () => {
            setSuperpowers([...superpowers, newPower])
            setNewPower('')
        }
        const deletePower = (idx) => {
            setSuperpowers(superpowers.filter((power, power_idx) => power_idx !== idx))
        }
        const selectFile = e => {
            setFiles(e.target.files)
        }
        const addHero = () => {
            const heroData = new FormData();

            heroData.append('nickname', name)
            heroData.append('real_name', realName)
            heroData.append('origin_description', originDesc)
            heroData.append('superpowers', JSON.stringify(superpowers))
            heroData.append('catch_phrase', catch_phrase)

            for (const file of files) {
                heroData.append('images', file);
            }
            createHero(heroData).then(
                hero => {
                    setSuccessVisible(true)
                    setHeroId(hero._id)
                }).catch(() => setErrorVisible(true))
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

                        <Form.Control
                            placeholder='Choose file'
                            className="mt-3"
                            type="file"
                            multiple
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
                    onHideOuterModal = {onHide}
                    show={errorVisible}
                />

                <SuccessModal
                    heroId={heroId}
                    message={'Hero has been successfully created.'}
                    onHide={() => setSuccessVisible(false)}
                    onHideOuterModal = {onHide}
                    show={successVisible}/>
            </Modal>

        );
    }
;

export default AddHeroModal;