import React from 'react';
import logo from "../images/marvelheroes.jpg";
import styles from "../pages/home/styles.module.css";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../utils/constRoutes";
import AddHero from "../pages/home/addHero";

const Header = () => {
    const navigate = useNavigate()
    const repeatImageTimes = 16
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
        <Container style={{background: 'rgb(131,41,127)'}}>
            <h2 style={{display: "flex", justifyContent: 'center', color: 'rgb(231,238,237)', paddingTop: '1rem'}}>
                Your favorite superheroes here
            </h2>
            <div style={{display: "flex", justifyContent: 'center'}}>
                {
                    images
                }
            </div>
            <AddHero/>

        </Container>
    );
};

export default Header;
