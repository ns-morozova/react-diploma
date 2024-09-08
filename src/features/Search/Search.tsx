import React from 'react';

import styles from './Search.module.css';

export const Search: React.FC = () => {
    return (
        <form className={styles.searchForm}>
            <input
                type="text"
                placeholder="Поиск"
                className={styles.searchInput}
            />
        </form>
    );
};