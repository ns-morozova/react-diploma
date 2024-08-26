import React from 'react';
import styles from './Banner.module.css';
import BannerImg from './assets/banner.jpg';

export const Banner: React.FC = () => {
    return (
        <div className={styles.banner}>
            <img src={BannerImg} className={styles.imgFluid} alt="К весне готовы!"></img>
            <h2 className={styles.bannerHeader}>К весне готовы!</h2>
        </div>
    );
};