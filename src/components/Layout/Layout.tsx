import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';

import styles from './Layout.module.css';

export const Layout = () => {
    return (
        // <>
        //     <Header />
        //     <Outlet />
        //     <Footer />
        // </>

        <div className={styles.layoutContainer}>
            <Header />
            <main className={styles.content}>
                <div className={styles.rowCont}>
                    <div className={styles.colCont}>
                        <Outlet />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
