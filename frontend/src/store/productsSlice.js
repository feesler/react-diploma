import { createSlice } from '@reduxjs/toolkit';

const CHUNK_SIZE = 6;

const defaultOptions = {
  categoryId: null,
  query: null,
};

const initialState = {
  items: [],
  loading: false,
  error: null,
  options: { ...defaultOptions },
  moreAvailable: true,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsReadRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    productsReadSuccess: (state, action) => {
      const { data, options } = action.payload;
      const { offset, ...restOpts } = options;

      const newState = {
        ...state,
        loading: false,
        moreAvailable: (data.length >= CHUNK_SIZE),
        options: { ...restOpts },
      };

      const append = (
        options.categoryId === state.options.categoryId
        && options.q === state.options.q
        && options.offset
      );

      newState.items = (append)
        ? [...state.items, ...data]
        : [...data];

      return newState;
    },
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
