import React from 'react';
import logo from "../images/marvelheroes.jpg";
import styles from "../pages/home/styles.module.css";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../utils/constRoutes";
import AddHero from "../pages/home/AddHero";

const Header = () => {
    const navigate = useNavigate()
    return (
        <Container style={{background: 'rgb(170,199,153)'}}>
            <h2 style={{display: "flex", justifyContent: 'center'}}>
                Your favorite superheroes here
            </h2>
            <div style={{display: "flex", justifyContent: 'center'}}>
                <img
                    src={logo}
                    alt={'logo'}
                    className={styles.logo}
                    onClick={() => navigate(HOME_ROUTE)}></img>
            </div>
            <AddHero></AddHero>
        </Container>
    );
};

export default Header;