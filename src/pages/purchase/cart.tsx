import React, { useState } from 'react';
import axios from 'axios';
import { CartItem } from './cartItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { initialCart } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../features/Loader';

import styles from './Cart.module.css';

export const Cart: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitOrder = () => {
    if (!agreed) {
      alert('Пожалуйста, ознакомьтесь с правилами доставки.');
      return;
    }

    const orderData = {
      owner: {
        phone,
        address,
      },
      items: items.map(item => ({
        id: item.id,
        price: item.price,
        count: item.quantity,
      })),
    };

    const fetchAddOrder = async () => {
      try {
        setLoading(true);
        await axios.post('https://react-diploma-backend-1ota.onrender.com/api/order', orderData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
        dispatch(initialCart());
        setAgreed(false);
        navigate('/catalog');        
      }
    };

    fetchAddOrder();
  };

  if (loading) {
    return <Loader />;
  }

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString('ru-RU');

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>Корзина</h1>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Размер</th>
            <th>Кол-во</th>
            <th>Стоимость</th>
            <th>Итого</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <CartItem key={item.id} data={item} />
          ))}
          <tr>
            <td colSpan={4} className={styles.totalCost}>Общая стоимость</td>
            <td colSpan={2}>{totalAmount} руб.</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.orderForm}>
        <h2 className={styles.title}>Оформить заказ</h2>
        <div>
          <label>
            Телефон:
            <input
              type="text"
              value={phone}
              placeholder="Ваш телефон"
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div>
          <label>
            Адрес доставки
            <input
              type="text"
              value={address}
              placeholder="Адрес доставки"
              onChange={(e) => setAddress(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className={styles.checkbox}
            />
            С правилами доставки ознакомлен
          </label>
        </div>
        <button
          onClick={handleSubmitOrder}
          disabled={!agreed}
          className={`${styles.button} ${!agreed ? styles.disabledButton : ''}`}
        >
          Оформить
        </button>
      </div>
    </div>
  );
};