import { createSlice } from '@reduxjs/toolkit';
import productsData from '../../assets/products.json';

const productSlice = createSlice({
  name: 'product',
  initialState: productsData,
  reducers: {},
});

export default productSlice.reducer;
