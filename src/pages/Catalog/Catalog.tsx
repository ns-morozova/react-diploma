import React, { useState } from 'react';
import { Banner } from '../../widgets/Banner';
import { Search } from '../../features/Search';
import { Categories } from '../../features/Categories';
import { CatalogItems } from '../../widgets/CatalogItems';

import styles from './Catalog.module.css';

export const Catalog: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    return (
        <div className={styles.catalog}>
            <Banner />
            <h2 className={styles.titleSection}>Каталог</h2>
            <Search />
            <Categories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            <CatalogItems selectedCategory={selectedCategory} />
        </div>
    );
};