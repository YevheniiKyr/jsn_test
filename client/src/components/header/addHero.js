import React, {useState} from 'react';
import AddHeroModal from "../../pages/home/addHeroModal";
import styles from "./header.module.scss"

const AddHero = () => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <div className={styles.button_wrapper}>
            <button
                className={styles.add_hero_button}
                onClick={() => setModalVisible(true)}
            >
                Create hero
            </button>
            <AddHeroModal show={modalVisible} onHide={() => setModalVisible(false)}/>
        </div>
    );
};

export default AddHero;