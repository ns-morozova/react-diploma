import React from 'react';
import { Banner } from '../../widgets/Banner';
import styles from './Home.module.css';

export const Home: React.FC = () => {
    return (
        <div className={styles.home}>
            <Banner />
        </div>
    );
};