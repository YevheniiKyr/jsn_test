import React from 'react';
import logo from "../../images/marvelheroes.jpg";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/constRoutes";
import AddHero from "./addHero";
import styles from "./header.module.scss"

const Header = () => {
    const navigate = useNavigate()
    const repeatImageTimes = 1
    const images = [];
    for (let i = 0; i < repeatImageTimes; i++) {
        images.push(
            <img
                key={i}
                src={logo}
                alt={'logo'}
                className={styles.logo}
                onClick={() => navigate(HOME_ROUTE)}
            />
        );
    }

    return (
        <header className={styles.header}>
            <div className={styles.images_wrapper}>{images}</div>
            <div className={styles.add_hero_section}><AddHero/></div>
        </header>
    );
};

export default Header;
