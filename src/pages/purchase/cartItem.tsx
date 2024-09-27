import React from "react";
import { useDispatch } from "react-redux";
import { delItemCart } from "../../store/slices/cartSlice";

import styles from './CartItem.module.css';

export interface ICartItem {
    id: number;
    name: string;
    size: string;
    quantity: number;
    price: number;
  }
  
interface CartItemProps {
    data: ICartItem,
  }

  export const CartItem: React.FC<CartItemProps> = ({data}) => {

    const dispatch = useDispatch();
  
    const handleRemoveItem = (id: number) => {
        dispatch(delItemCart(id));
    };

    const formattedPrice = data.price.toLocaleString('ru-RU');
    const formattedTotalPrice = (data.price * data.quantity).toLocaleString('ru-RU');
  
    return (
              <tr key={data.id}>
                <td className={styles.nameItem}>{data.name}</td>
                <td>{data.size}</td>
                <td>{data.quantity}</td>
                <td>{formattedPrice} руб.</td>
                <td>{formattedTotalPrice} руб.</td>
                <td>
                  <button onClick={() => handleRemoveItem(data.id)} className={styles.buttonDelete}>Удалить</button>
                </td>
              </tr>
      );
    };  