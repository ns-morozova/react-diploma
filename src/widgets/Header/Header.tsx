import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearch } from '../../store/slices/searchSlice';
import styles from './Header.module.css';
import LogoHeader from './assets/header-logo.png';
import { RootState } from '../../store';

export const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [invisibleSearch, setInvisibleSearch] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    const dispatch = useDispatch();
    const {count} = useSelector((state: RootState) => state.cart);

    const menuItems = [
        { text: 'Главная', url: '/' },
        { text: 'Каталог', url: '/catalog' },
        { text: 'О магазине', url: '/about' },
        { text: 'Контакты', url: '/contacts' },
    ];

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setInvisibleSearch(true);
        dispatch(updateSearch(searchInput));
        navigate('/catalog');
    };

    const handleSearchBlur = () => {
        setInvisibleSearch(true);
        dispatch(updateSearch(searchInput));
        navigate('/catalog');
    };

    const handleCardClick = () => {
        navigate('/cart');
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

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
                            <div className={styles.headerControls}>
                                <form
                                    data-id="search-form"
                                    className={`${styles.headerControlsSearchForm} ${invisibleSearch ? styles.invisible : ''}`}
                                    onSubmit={handleSearchSubmit}
                                >
                                    <input
                                        className={styles.formControl}
                                        placeholder="Поиск"
                                        value={searchInput}
                                        onChange={handleInputChange}
                                        onBlur={handleSearchBlur}
                                    />
                                </form>
                                <div className={styles.headerControlsPics}>
                                    <div
                                        data-id="search-expander"
                                        className={`${styles.headerControlsPic} ${styles.headerControlsSearch}`}
                                        onClick={() => setInvisibleSearch(!invisibleSearch)}
                                    ></div>
                                    <div 
                                        className={`${styles.headerControlsPic} ${styles.headerControlsCart}`}
                                        onClick={handleCardClick}
                                        >
                                        <div 
                                            className={`${styles.headerControlsCartFull} ${count?'':styles.invisible}`}>
                                            {count.toString()}
                                        </div>
                                        <div className={styles.headerControlsCartMenu}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};