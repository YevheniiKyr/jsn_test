import React, {useEffect, useState} from 'react';
import HeroList from "./heroList";
import {getHeroes} from "../../api/heroApi";
import {Col, Container, Spinner} from "react-bootstrap";
import Pages from "./pages";
import styles from "./styles.module.css"

const Index = () => {

    let [heroes, setHeroes] = useState([])
    let [loading, setLoading] = useState(true)

    let [limit, setLimit] = useState(5)
    let [page, setPage] = useState(1)
    let [count, setCount] = useState(0)


    useEffect(() => {
        getHeroes(limit, page).then(({heroes, count}) => {
            setHeroes(heroes)
            setCount(count)
            setLoading(false)
        })
    }, [limit, page])

    if (loading) return <Spinner className={styles.spinner}/>

    if (heroes) {
        return (
            <Container className={styles.theme}>
                <Col md={12}>
                    <HeroList heroes={heroes}></HeroList>
                    <Pages current_page={page} count={count} limit={limit} setPage={(page) => setPage(page)}></Pages>
                </Col>
            </Container>
        );
    }
    return <div> No heroes yet</div>
};

export default Index;