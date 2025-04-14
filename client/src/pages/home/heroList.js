import React from 'react';
import HeroItem from "./heroItem";
import styles from './styles.module.scss';

const HeroList = ({heroes}) => {
    if (heroes.length === 0) {
        return (
            <div className={styles.list_wrapper}>
                <h2 style={{textAlign: "center", margin: "auto"}}>
                    There are no heroes in our base. Please, add some!
                </h2>
            </div>
        );
    }
    return (
        <div className={styles.list_wrapper}>
            {heroes.map(hero => <HeroItem key={hero._id} hero={hero}/>)}
        </div>
    );
};

export default HeroList;