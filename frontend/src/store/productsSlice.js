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
  searchQuery: '',
};

export const getProductsCount = (state) => state.products.items.length;

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

      if (restOpts.categoryId) {
        restOpts.categoryId = Number(restOpts.categoryId);
      }

      const newState = {
        ...state,
        loading: false,
        moreAvailable: (data.length >= CHUNK_SIZE),
        options: { ...restOpts },
        items: [...data],
      };

      return newState;
    },
    productsReadFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }),

    readNext: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    readNextSuccess: (state, action) => {
      const { data, options } = action.payload;
      const { offset, ...restOpts } = options;

      if (restOpts.categoryId) {
        restOpts.categoryId = Number(restOpts.categoryId);
      }

      const newState = {
        ...state,
        loading: false,
        moreAvailable: (data.length >= CHUNK_SIZE),
        options: { ...restOpts },
        items: [...state.items, ...data],
      };

      return newState;
    },
    readNextFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    changeSearchQuery: (state, action) => ({
      ...state,
      searchQuery: action.payload,
    }),
  },
});

export const {
  productsReadRequest,
  productsReadSuccess,
  productsReadFailure,
  readNext,
  readNextSuccess,
  readNextFailure,
  changeSearchQuery,
} = productsSlice.actions;
export default productsSlice.reducer;
