import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: null,
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
      error: action.payload,
    }),
  },
});

export const {
  categoriesReadRequest,
  categoriesReadSuccess,
  categoriesReadFailure,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
