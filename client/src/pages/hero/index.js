import React, {useEffect, useState} from 'react';
import {Card, Spinner} from "react-bootstrap";
import styles from "./styles.module.scss";
import {useNavigate, useParams} from "react-router-dom";
import {deleteHeroById, getHeroById} from "../../api/heroApi";
import ImagesList from "./imagesList";
import HeroInfo from "./heroInfo";
import EditHeroModal from "./editHeroModal";
import DangerModal from "../../components/modals/dangerModal";

const Index = () => {

    const {id} = useParams()
    let [hero, setHero] = useState({})
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState()
    const [editVisible, setEditVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setUpdated(false)
        getHeroById(id)
            .then(hero => setHero(hero))
            .catch(err => setError(err))
            .finally(() => setLoading(false)
            )
    }, [id, updated])

    const deleteHero = async () => {
        deleteHeroById(id).then(() => {
            setDeleteVisible(true)
            navigate("/")
        }).catch(err => setError(err))
    }
    if (loading) return <Spinner className={styles.spinner}/>
    if (error) return <div className={styles.error_message}> Service is unavailable now. We are fixing it </div>

    return (
        <div className={styles.main_wrapper}>
            <Card className={styles.card}>
                <ImagesList images={hero.images}/>
                <HeroInfo hero={hero}></HeroInfo>
                <section className={styles.actions_section}>
                    <button
                        className={styles.edit_button}
                        onClick={() => setEditVisible(true)}
                    >edit
                    </button>
                    <button
                        className={styles.delete_button}
                        onClick={() => setDeleteVisible(true)}
                    >delete
                    </button>
                </section>
                <EditHeroModal
                    hero={hero}
                    show={editVisible}
                    onHide={() => setEditVisible(false)}
                    updated={() => setUpdated(true)}>
                </EditHeroModal>
                <DangerModal
                    show={deleteVisible}
                    onHide={deleteHero}
                    message={"Are you sure you want to delete this hero?"}
                    closeButtonText={"Yes"}
                >
                </DangerModal>
            </Card>
        </div>
    );
};

export default Index;