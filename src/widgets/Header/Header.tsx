import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import LogoHeader from './assets/header-logo.png';

export const Header: React.FC = () => {
    const location = useLocation();

    const menuItems = [
        { text: 'Главная', url: '/' },
        { text: 'Каталог', url: '/catalog' },
        { text: 'О магазине', url: '/about' },
        { text: 'Контакты', url: '/contacts' },
    ];

    return (
        <header className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <nav className={styles.navbar}>
                        <Link className={styles.navbarBrand} to="/">
                            <img src={LogoHeader} alt="Bosa Noga" />
                        </Link>
                        <div className={styles.collapse} id="navbarMain">
                            <ul className={styles.navList}>
                                {menuItems.map((item, index) => {
                                    const isSelected = location.pathname === item.url;
                                    return (
                                        <li
                                            className={`${styles.navItem} ${isSelected ? styles.navItemSelect : ''}`}
                                            key={index}
                                        >
                                            <Link to={item.url} className={styles.link}>
                                                {item.text}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div>
                                <div className={styles.headerControlsPics}>
                                    <div data-id="search-expander" className={`${styles.headerControlsPic} ${styles.headerControlsSearch}`}>

                                    </div>
                                    {/* Do programmatic navigation on click to /cart.html */}
                                    <div className={`${styles.headerControlsPic} ${styles.headerControlsCart}`}>
                                        <div className={styles.headerControlsCartFull}>1</div>
                                        <div className={styles.headerControlsCartMenu}></div>
                                    </div>
                                </div>
                                <form data-id="search-form" className={`${styles.headerControlsSearchForm} ${styles.formInline} ${styles.invisible}`}>
                                    <input className={styles.formControl} placeholder="Поиск" />
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};