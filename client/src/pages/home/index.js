import React, {useEffect, useState} from 'react';
import HeroList from "./heroList";
import {getHeroes} from "../../api/heroApi";
import {Col, Container, Spinner} from "react-bootstrap";
import Pages from "./pages";
import styles from "./styles.module.scss"

const Index = () => {

    let [heroes, setHeroes] = useState([])
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState()

    let [limit, setLimit] = useState(5)
    let [page, setPage] = useState(1)
    let [count, setCount] = useState(0)


    useEffect(() => {
        getHeroes(limit, page).then(({heroes, count}) => {
            setHeroes(heroes)
            setCount(count)
            setLoading(false)
        })
    }, [
        // limit, page
    ])

    if (loading) return <Spinner className={styles.spinner}/>
    if (error) return <div className={styles.errorMessage}> Service is unavailable now. We are fixing it </div>
    if (heroes) {
        return (
            <div className={styles.page_wrapper}>
                    <HeroList heroes={heroes}></HeroList>
                    <Pages current_page={page} count={count} limit={limit} setPage={(page) => setPage(page)}></Pages>
            </div>
        );
    }
    return <div> No heroes yet</div>
};

export default Index;