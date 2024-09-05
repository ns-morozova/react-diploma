import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Categories.module.css';

interface Category {
  id: number | null;
  title: string;
}

interface CategoriesProps {
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await axios.get('https://react-diploma-backend-1ota.onrender.com/api/categories');
        const categoriesData = [{ id: null, title: 'Все' }, ...response.data];
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className={styles.categories}>
      {loadingCategories ? (
        <div>Loading categories...</div>
      ) : (
        <ul className={styles.categoryList}>
          {categories.map(category => (
            <li
              key={category.id || 'all'}
              className={`${styles.categoryItem} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};