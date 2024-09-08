import React, { useState } from 'react';
import { Banner } from '../../widgets/Banner';
import { Bestsellers } from '../../widgets/Bestsellers';
import { Categories } from '../../features/Categories';
import { CatalogItems } from '../../widgets/CatalogItems';

import styles from './Home.module.css';

export const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    return (
        <div className={styles.home}>
            <Banner />
            <Bestsellers />
            <h2 className={styles.titleSection}>Каталог</h2>
            <Categories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            <CatalogItems selectedCategory={selectedCategory} />
        </div>
    );
};