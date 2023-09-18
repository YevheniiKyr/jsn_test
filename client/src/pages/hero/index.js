import React, {useEffect, useState} from 'react';
import {Card, CardImg, Container, Spinner} from "react-bootstrap";
import styles from "./styles.module.css";
import {useParams} from "react-router-dom";
import {getHeroById} from "../../api/heroApi";
import ImagesList from "./imagesList";
import HeroInfo from "./heroInfo";

const Index = () => {

    const {id} = useParams()
    let [hero, setHero] = useState()
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState()

    useEffect(() => {
        getHeroById(id)
            .then(hero => setHero(hero))
            .catch(err => setError(err))
            .finally(() =>setLoading(false)
        )

    }, [])
    if (loading) return <Spinner className={styles.spinner}/>
    if (error) return <div className={styles.errorMessage}> Service is unavailable now. We are fixing it </div>

    return (
        <Container>
            <ImagesList images={hero.images}/>
            <HeroInfo hero={hero}></HeroInfo>
        </Container>
    );
};

export default Index;