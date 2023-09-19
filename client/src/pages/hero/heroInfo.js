import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import styles from "./styles.module.css";
import EditHeroModal from "./editHeroModal";

const HeroInfo = ({hero}) => {


    const [editVisible, setEditVisible] = useState(false)
    return (
        <Card style={{padding: '1rem', background: 'rgb(138,131,192)', width: '50%', margin: "auto"}}>
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
            <div style={{display: "flex", justifyContent: "center", marginTop: '1rem'}}>
                <button
                    className={styles.edit_button}
                    onClick={() => setEditVisible(true)}
                >edit
                </button>
                <button className={styles.delete_button}>delete</button>
            </div>
            <EditHeroModal hero={hero} show={editVisible} onHide={() => setEditVisible(false)}></EditHeroModal>
        </Card>
    );
};

export default HeroInfo;