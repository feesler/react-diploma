import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: null,
  loading: false,
  error: null,
  selectedSize: null,
  quantity: 1,
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    detailsReadRequest: (state) => ({
      ...state,
      item: null,
      loading: true,
      error: null,
    }),
    detailsReadSuccess: (state, action) => ({
      ...state,
      item: { ...action.payload.data },
      loading: false,
      selectedSize: null,
      quantity: 1,
    }),
    detailsReadFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    selectSize: (state, action) => ({
      ...state,
      selectedSize: action.payload,
    }),
    setQuantity: (state, action) => ({
      ...state,
      quantity: action.payload,
    }),
  },
});

export const {
  detailsReadRequest,
  detailsReadSuccess,
  detailsReadFailure,
  selectSize,
  setQuantity,
} = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
