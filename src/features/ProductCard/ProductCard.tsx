import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, imageUrl }) => {
  const formattedPrice = price.toLocaleString('ru-RU');

  return (
    <div className={styles.productCard}>
      <img src={imageUrl} alt={title} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{title}</h3>
        <p className={styles.productPrice}>{formattedPrice} ₽</p>
        <Link to={`/catalog/${id}`} className={styles.orderButton}>
          Заказать
        </Link>
      </div>
    </div>
  );
};