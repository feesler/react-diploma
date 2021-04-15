import { createSlice } from '@reduxjs/toolkit';

const CHUNK_SIZE = 6;

const defaultOptions = {
  categoryId: null,
  q: null,
};

const initialState = {
  items: null,
  loading: false,
  loadingNext: false,
  error: null,
  /* Curent options in case of successfull request */
  options: { ...defaultOptions },
  /* Form data */
  form: {
    q: '',
    categoryId: null,
  },
  moreAvailable: true,
};

/* Selectors */
export const getProducts = (state) => state.products;

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsReadRequest: (state, action) => ({
      ...state,
      loading: true,
      items: null,
      error: null,
      form: { ...action.payload },
    }),
    productsReadSuccess: (state, action) => {
      const { data, options } = action.payload;
      const { offset, ...restOpts } = options;

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
      error: action.payload,
    }),

    readNext: (state) => ({
      ...state,
      loadingNext: true,
      error: null,
    }),
    readNextSuccess: (state, action) => {
      const { data, options } = action.payload;
      const { offset, ...restOpts } = options;

      const newState = {
        ...state,
        loadingNext: false,
        moreAvailable: (data.length >= CHUNK_SIZE),
        options: { ...restOpts },
        items: [...state.items, ...data],
      };

      return newState;
    },
    readNextFailure: (state, action) => ({
      ...state,
      loadingNext: false,
      error: action.payload,
    }),

    changeSearchQuery: (state, action) => ({
      ...state,
      form: {
        ...state.form,
        q: action.payload,
      },
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
