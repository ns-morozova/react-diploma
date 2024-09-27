import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../../pages/purchase/cartItem';

export interface CartState {
  items: ICartItem[],
  count: number,
}

// Функция для загрузки состояния корзины из localStorage
const loadState = (): CartState => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return { items: [], count: 0 };
    }
    return JSON.parse(serializedState) as CartState;
  } catch (err) {
    return { items: [], count: 0 };
  }
};

// Функция для сохранения состояния корзины в localStorage
const saveState = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    // Игнорируем ошибки записи в localStorage
  }
};

const initialState: CartState = loadState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemCart: (state, action: PayloadAction<ICartItem>) => {
      let count = 0;
      let itemExists = false;

      state.items.forEach(item => {
        if (item.id === action.payload.id) {
          item.quantity += action.payload.quantity;
          itemExists = true;
        }
        count += item.quantity;
      });

      if (!itemExists) {
        state.items.push(action.payload);
        count += action.payload.quantity;
      }

      state.count = count;
      saveState(state); 
    },
    delItemCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      let count = 0;
      state.items.forEach(item => {
        count += item.quantity;
      });
      state.count = count;
      saveState(state); 
    },
    initialCart: (state) => {
        state.items = [];
        state.count = 0;
        saveState(state); 
    },
  },
});

export const { addItemCart, delItemCart, initialCart } = cartSlice.actions;
export default cartSlice.reducer;