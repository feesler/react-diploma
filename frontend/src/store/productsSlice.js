import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  options: {
    catogery: null,
    query: null,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsReadRequest: (state /* , action */) => ({
      ...state,
      loading: true,
      error: null,
    }),
    productsReadSuccess: (state, action) => ({
      ...state,
      loading: false,
      items: [...action.payload],
    }),
    productsReadFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }),
  },
});

export const {
  productsReadRequest,
  productsReadSuccess,
  productsReadFailure,
} = productsSlice.actions;
export default productsSlice.reducer;
