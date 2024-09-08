import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductCard } from '../../features/ProductCard';

import styles from './Bestsellers.module.css';

interface BestsellerItem {
    id: number;
    title: string;
    price: number;
    images: string[];
  }
  
  export const Bestsellers: React.FC = () => {
    const [bestsellers, setBestsellers] = useState<BestsellerItem[]>([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchBestsellers = async () => {
        setLoading(true);
        try {
          const response = await axios.get('https://react-diploma-backend-1ota.onrender.com/api/top-sales');
          setBestsellers(response.data);
        } catch (error) {
          console.error('Error fetching bestsellers:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBestsellers();
    }, []);
  
    // Если хитов продаж нет, не показываем компонент
    if (!loading && bestsellers.length === 0) {
      return null;
    }
  
    return (
      <section className={styles.bestsellers}>
        <h2 className={styles.titleSection}>Хиты продаж!</h2>
        {loading ? (
          <div className={styles.loader}>Loading bestsellers...</div>
        ) : (
          <div className={styles.bestsellerItems}>
            {bestsellers.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.images[0]}
              />
            ))}
          </div>
        )}
      </section>
    );
  };