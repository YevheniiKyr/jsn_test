import React from 'react';
import HeroItem from "./heroItem";
import {Row} from "react-bootstrap";
import styles from './styles.module.css';

const HeroList = ({heroes}) => {


    return (
        <Row className={styles.heroList}>
            {
              heroes.map(
                  hero => <HeroItem key={hero._id} hero={hero}/>
              )
            }
        </Row>
    );
};

export default HeroList;