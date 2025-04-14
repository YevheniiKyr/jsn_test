import React from 'react';
import styles from "./styles.module.scss";

const HeroInfo = ({hero}) => {

    return (
        <div className={styles.hero_info_wrapper}>
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
                            (power, idx) =>
                                <div key={idx}>
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
        </div>
    );
};

export default HeroInfo;