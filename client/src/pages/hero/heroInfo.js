import React from 'react';
import {Card} from "react-bootstrap";
import styles from "./styles.module.css";

const HeroInfo = ({hero}) => {
    return (
        <Card>
            <div className={styles.title}>
                {hero.nickname}
            </div>
            <div className={styles.field}>
                <div className={styles.field_name}>Real name:</div>
                <div className={styles.field_value}>{hero.real_name}</div>
            </div>
            <div className={styles.field}>
                <div className={styles.field_name}>Origin:</div>
                <div className={styles.field_value}>{hero.origin_description}</div>
            </div>
            <div className={styles.field}>
                <div className={styles.field_name}>Superpowers:</div>
                <div className={styles.field_value}>
                    {
                        hero.superpowers.map(
                            power =>
                                <div>
                                    {power}
                                </div>
                        )
                    }
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.field_name}>Catch phrase:</div>
                <div className={styles.field_value}>{hero.catch_phrase}</div>
            </div>
        </Card>
    );
};

export default HeroInfo;