import React, {useEffect, useState} from 'react';
import {Card, Spinner} from "react-bootstrap";
import styles from "./styles.module.scss";
import {useParams} from "react-router-dom";
import {getHeroById} from "../../api/heroApi";
import ImagesList from "./imagesList";
import HeroInfo from "./heroInfo";
import EditHeroModal from "./editHeroModal";

const Index = () => {

    const {id} = useParams()
    let [hero, setHero] = useState({})
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState()
    const [editVisible, setEditVisible] = useState(false)
    const [updated, setUpdated] = useState(false)

    useEffect(() => {
        setUpdated(false)
        getHeroById(id)
            .then(hero => setHero(hero))
            .catch(err => setError(err))
            .finally(() => setLoading(false)
            )
    }, [id, updated])

    if (loading) return <Spinner className={styles.spinner}/>
    if (error) return <div className={styles.errorMessage}> Service is unavailable now. We are fixing it </div>

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
                    <button className={styles.delete_button}>delete</button>
                </section>
                <EditHeroModal
                    hero={hero}
                    show={editVisible}
                    onHide={() => setEditVisible(false)}
                    updated={() => setUpdated(true)}></EditHeroModal>
            </Card>
        </div>
    );
};

export default Index;