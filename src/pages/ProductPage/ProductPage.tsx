import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Banner } from '../../widgets/Banner';
import { Loader } from '../../features/Loader';

import styles from './ProductPage.module.css';

interface ProductDetails {
  id: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  season: string;
  reason: string;
  sizes: { size: string; available: boolean }[];
}

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID из URL
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://react-diploma-backend-1ota.onrender.com/api/items/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (selectedSize) {
      // Логика добавления в корзину (например, через Redux)
      navigate('/cart.html');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const availableSizes = product.sizes.filter(size => size.available);

  return (
    <div className={styles.productPage}>
      <Banner />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <div className={styles.productInfo}>
        <div className={styles.imgCont}>
          <img src={product.images[0]} alt={product.title} className={styles.productImage} />
        </div>
        <div className={styles.productDetails}>
          <table className={styles.productTable}>
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{product.sku || '-'}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{product.manufacturer || '-'}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{product.color || '-'}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{product.material || '-'}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{product.season || '-'}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{product.reason || '-'}</td>
              </tr>
            </tbody>
          </table>

          {availableSizes.length > 0 && (
            <div className={styles.choice}>
              <div className={styles.sizes}>
                <span>Размеры в наличии:</span>
                <div className={styles.sizeOptions}>
                  {availableSizes.map(size => (
                    <button
                      key={size.size}
                      className={`${styles.sizeButton} ${selectedSize === size.size ? styles.selected : ''}`}
                      onClick={() => setSelectedSize(size.size)}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.quantityBlock}>
                <label>Количество:</label>
                <div className={styles.quantitySelector}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))} // Уменьшение количества, минимум 1
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <span className={styles.quantityDisplay}>{quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => setQuantity(prev => Math.min(10, prev + 1))} // Увеличение количества, максимум 10
                    disabled={quantity === 10}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                В корзину
              </button>
            </div>
          )}
          {availableSizes.length === 0 && <p>Размеры не доступны</p>}
        </div>
      </div>
    </div>
  );
};