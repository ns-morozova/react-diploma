import React from 'react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, imageUrl }) => {
  const handleOrder = () => {
    // Логика заказа
    alert(`Product ${id} order`);
  };

  const formattedPrice = price.toLocaleString('ru-RU');

  return (
    <div className={styles.productCard}>
      <img src={imageUrl} alt={title} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{title}</h3>
        <p className={styles.productPrice}>{formattedPrice} ₽</p>
        <button className={styles.orderButton} onClick={handleOrder}>
            Заказать
        </button>
      </div>
    </div>
  );
};