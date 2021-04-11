import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {
    topSalesReadRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    topSalesReadSuccess: (state, action) => ({
      ...state,
      loading: false,
      items: [...action.payload],
    }),
    topSalesReadFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }),
  },
});

export const {
  topSalesReadRequest,
  topSalesReadSuccess,
  topSalesReadFailure,
} = topSalesSlice.actions;
export default topSalesSlice.reducer;
