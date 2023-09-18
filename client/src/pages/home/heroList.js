import React, {useEffect} from 'react';
import HeroItem from "./heroItem";
import {Container, Row} from "react-bootstrap";
import styles from './styles.module.css';
import AddHero from "./AddHero";

const HeroList = ({heroes}) => {


    return (
        <Row className={styles.heroList}>
            {
              heroes.map(
                  hero => <HeroItem key={hero._id} hero={hero}/>
              )
            }
            {/*<AddHero className={styles.addHero}></AddHero>*/}
        </Row>
    );
};

export default HeroList;