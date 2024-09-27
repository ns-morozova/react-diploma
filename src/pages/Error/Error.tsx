import React from 'react';
import { Banner } from '../../widgets/Banner';

import styles from './Error.module.css';

export const Error: React.FC = () => {
    return (
        <div className={styles.catalog}>
            <Banner />
            <section>
                <h2 className={styles.titleError}>Страница не найдена</h2>
                <p className={styles.textError}>
                    Извините, такая страница не найдена!
                </p>
            </section>
        </div>
    );
};