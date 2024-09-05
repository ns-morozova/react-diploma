import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductCard } from '../../features/ProductCard';

import styles from './CatalogItems.module.css';

interface CatalogItem {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface CatalogItemsProps {
  selectedCategory: number | null;
}

export const CatalogItems: React.FC<CatalogItemsProps> = ({ selectedCategory }) => {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [loadingItems, setLoadingItems] = useState(false);
  const [loadMoreAvailable, setLoadMoreAvailable] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoadingItems(true);
      try {
        const categoryQuery = selectedCategory ? `?categoryId=${selectedCategory}` : '';
        const response = await axios.get(`https://react-diploma-backend-1ota.onrender.com/api/items${categoryQuery}`);
        setItems(response.data);
        setLoadMoreAvailable(response.data.length >= 6);
        setOffset(6); // Reset offset after new category selection
      } catch (error) {
        console.error('Error fetching catalog items:', error);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  const loadMoreItems = async () => {
    setLoadingItems(true);
    try {
      const categoryQuery = selectedCategory ? `&categoryId=${selectedCategory}` : '';
      const response = await axios.get(`https://react-diploma-backend-1ota.onrender.com/api/items?offset=${offset}${categoryQuery}`);
      setItems(prevItems => [...prevItems, ...response.data]);
      setOffset(offset + 6);
      setLoadMoreAvailable(response.data.length >= 6);
    } catch (error) {
      console.error('Error loading more items:', error);
    } finally {
      setLoadingItems(false);
    }
  };

  return (
    <section className={styles.catalog}>
      {loadingItems ? (
        <div>Loading catalog...</div>
      ) : (
        items.length > 0 && (
          <div className={styles.catalogItems}>
            {items.map(item => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.images[0]}
              />
            ))}
          </div>
        )
      )}
      {loadMoreAvailable && (
        <div className={styles.loadMoreContainer}>
          <button
            className={styles.loadMoreButton}
            onClick={loadMoreItems}
            disabled={loadingItems}
          >
            {loadingItems ? 'Загрузка...' : 'Загрузить ещё'}
          </button>
        </div>
      )}
    </section>
  );
};