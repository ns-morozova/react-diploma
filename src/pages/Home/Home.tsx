import React, { useState } from 'react';
import { Banner } from '../../widgets/Banner';
import styles from './Home.module.css';

import { Categories } from '../../features/Categories';
import { CatalogItems } from '../../widgets/CatalogItems';

export const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    return (
        <div className={styles.home}>
            <Banner />
            <Categories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            <CatalogItems selectedCategory={selectedCategory} />
        </div>
    );
};