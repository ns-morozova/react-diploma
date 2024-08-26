import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css'

export const Footer: React.FC = () => {
    const location = useLocation();

    const menuItems = [
        { text: 'О магазине', url: '/about' },
        { text: 'Каталог', url: '/catalog' },
        { text: 'Контакты', url: '/contacts' },
    ];
    return (
        <footer className={`${styles.container} ${styles.footer}`}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <section className={styles.footerSection}>
                        <h5 className={styles.title}>Информация</h5>
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
                    </section>
                </div>
                <div className={styles.footerPayment}>
                    <section className={styles.footerSection}>
                        <h5 className={styles.title}>Принимаем к оплате:</h5>
                        <div className={styles.footerPay}>
                            <div className={`${styles.footerPaySystems} ${styles.footerPaySystemsPaypal}`}></div>
                            <div className={`${styles.footerPaySystems} ${styles.footerPaySystemsMasterCard}`}></div>
                            <div className={`${styles.footerPaySystems} ${styles.footerPaySystemsVisa}`}></div>
                            <div className={`${styles.footerPaySystems} ${styles.footerPaySystemsYandex}`}></div>
                            <div className={`${styles.footerPaySystems} ${styles.footerPaySystemsWebmoney}`}></div>
                            <div className={`${styles.footerPaySystems} ${styles.footerPaySystemsQiwi}`}></div>
                        </div>
                    </section>
                    <section className={styles.copyrightBlock}>
                        <div className={styles.footerCopyright}>
                            2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров. Все права защищены.
                        </div>
                        <div className={styles.footerCopyright}>
                            Доставка по всей России!
                        </div>
                    </section>
                </div>
                <div className={`${styles.textRight}`}>
                    <section className={`${styles.footerSection} ${styles.footerContacts}`}>
                        <h5 className={styles.title}>Контакты:</h5>
                        <div className={styles.contactsList}>
                            <a className={styles.footerContactsPhone} href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
                            <span className={styles.footerContactsWorkingHours}>Ежедневно: с 09-00 до 21-00</span>
                            <a className={styles.footerContactsEmail} href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
                        </div>
                        <div className={styles.footerSocialLinks}>
                            <div className={`${styles.footerSocialLink} ${styles.footerSocialLinkTwitter}`}></div>
                            <div className={`${styles.footerSocialLink} ${styles.footerSocialLinkVk}`}></div>
                        </div>
                    </section>
                </div>
            </div>
        </footer>
    );
};