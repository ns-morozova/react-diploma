import { combineReducers } from 'redux';
import searchReducer from './searchSlice';
import cartReducer from './cartSlice'

const rootReducer = combineReducers({
  search: searchReducer,
  cart: cartReducer,
});

export default rootReducer;