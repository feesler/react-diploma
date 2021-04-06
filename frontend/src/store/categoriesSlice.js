import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesReadRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    categoriesReadSuccess: (state, action) => ({
      ...state,
      loading: false,
      items: [...action.payload],
    }),
    categoriesReadFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }),
  },
});

export const {
  categoriesReadRequest,
  categoriesReadSuccess,
  categoriesReadFailure,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
