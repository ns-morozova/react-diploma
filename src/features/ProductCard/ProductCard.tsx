import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, imageUrl }) => {
  const navigate = useNavigate();
  const formattedPrice = price.toLocaleString('ru-RU');

  const handleOrderClick = () => {
    navigate(`/catalog/${id}`, { state: { price } });
  };

  return (
    <div className={styles.productCard}>
      <img src={imageUrl} alt={title} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{title}</h3>
        <p className={styles.productPrice}>{formattedPrice} ₽</p>
        <button onClick={handleOrderClick} className={styles.orderButton}>
          Заказать
        </button>
      </div>
    </div>
  );
};